import { useRef, useState } from "react";

import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";

import { useAuth, useFirebaseApp, useFirestore } from "reactfire";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";

import {
  Box,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import ActionBar from "../ui/ActionBar";
import StyledCard from "../ui/StyledCard";
import { ephimeralNotification, showNotification } from "../../store/uiSlice";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { deleteApp, initializeApp } from "firebase/app";

const validator = require("email-validator");

const EmployeeForm = (props) => {
  const { employee, employeeRef } = props;

  const dispatch = useDispatch();
  const firebase = useFirebaseApp();
  const firestore = useFirestore();
  const auth = useAuth();
  const employeesCollectionRef = collection(firestore, "users");

  const history = useHistory();

  const nameInputRef = useRef();
  const emailInputRef = useRef();

  const [selectedRole, setSelectedRole] = useState("");
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [roleError, setRoleError] = useState(null);

  const nameChangeHandler = (event) => {
    setNameError(null);
  };

  const emailChangeHandler = (event) => {
    setEmailError(null);
  };

  const roleChangeHandler = (event) => {
    setSelectedRole(event.target.value);
    setRoleError(null);
  };

  const validateFields = (name, email, role) => {
    let formIsValid = true;

    if (name === "" || name.length < 3) {
      setNameError(
        "El nombre del empleado no debe estar vacío y debe tener más de dos caracteres."
      );
      formIsValid = false;
    }
    if (email === "") {
      setEmailError("El correo electrónico no debe estar vacío.");
      formIsValid = false;
    }
    if (!validator.validate(email)) {
      setEmailError("El correo electrónico no es válido.");
      formIsValid = false;
    }
    if (role === "") {
      setRoleError("Debes seleccionar un rol.");
      formIsValid = false;
    }

    return formIsValid;
  };

  const saveEmployeeHandler = async (event) => {
    const name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const role = selectedRole;

    if (validateFields(name, email, role)) {
      const secondaryApp = initializeApp({ ...firebase.options }, "ephimeral");
      try {
        dispatch(
          showNotification({
            status: "info",
            message: "Registrando nuevo empleado...",
          })
        );
        if (employee) {
          return;
        } else {
          const userCred = await createUserWithEmailAndPassword(
            getAuth(secondaryApp),
            email,
            "testers"
          );

          await setDoc(doc(firestore, "users", userCred.user.uid), {
            displayName: name,
            email,
            role,
            creationTime: new Date(userCred.user.metadata.creationTime),
          });

          deleteApp(secondaryApp);
          dispatch(
            ephimeralNotification({
              status: "success",
              message: "Se ha registrado un nuevo empleado.",
            })
          );
        }

        history.push("/employees");
      } catch (error) {
        dispatch(
          ephimeralNotification({
            status: "error",
            message: "Ocurrió un error al registrar al empleado.",
          })
        );
      }
    }
  };

  const actions = [
    {
      label: "Registrar empleado",
      color: "info",
      icon: <SaveIcon />,
      onClick: saveEmployeeHandler,
    },
    {
      label: "Cancelar",
      color: "error",
      icon: <CancelIcon />,
      onClick: (event) => history.push("/employees"),
    },
  ];

  return (
    <>
      <ActionBar actions={actions} />
      <StyledCard
        sx={{
          position: "relative",
          width: { xs: "90%", lg: "70%" },
          margin: "auto",
          mt: "1rem",
          mb: "1rem",
        }}
      >
        <CardContent>
          <Box component="form">
            <Grid container rowSpacing={2} columnSpacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre"
                  inputRef={nameInputRef}
                  helperText={nameError !== null && nameError}
                  error={nameError !== null}
                  onChange={nameChangeHandler}
                  fullWidth
                  defaultValue={employee ? employee.displayName : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Correo electrónico"
                  inputRef={emailInputRef}
                  helperText={emailError !== null && emailError}
                  error={emailError !== null}
                  onChange={emailChangeHandler}
                  fullWidth
                  type="email"
                  defaultValue={employee ? employee.email : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="select-role-label">Rol</InputLabel>
                  <Select
                    labelId="select-role-label"
                    id="select-role"
                    label="Rol"
                    error={roleError !== null}
                    onChange={roleChangeHandler}
                    value={selectedRole}
                  >
                    <MenuItem value="Administrador">Administrador</MenuItem>
                    <MenuItem value="Empleado">Empleado</MenuItem>
                  </Select>
                  <FormHelperText error={roleError !== null}>
                    {roleError}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </StyledCard>
    </>
  );
};

export default EmployeeForm;
