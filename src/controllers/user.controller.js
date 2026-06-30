import {
  getAllUsersService,
  getUserService,
  createUserService,
  updateUserService,
  deleteUserService,
  logInService,
} from "../services/user.service.js";

// Obtener todos
export async function getAllUsers(req, res) {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener uno
export async function getUser(req, res) {
  try {
    const user = await getUserService(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear
export async function createUser(req, res) {
  try {
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Modificar
export async function updateUser(req, res) {
  try {
    const user = await updateUserService(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar
export async function deleteUser(req, res) {
  try {
    const user = await deleteUserService(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Login
export async function logIn(req, res) {
  try {
    const { email, password } = req.body;

    const result = await logInService(email, password);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
