import {
  getAllUsersService,
  getUserService,
  createUserService,
  updateUserService,
  deleteUserService,
  logInService,
} from "../services/user.service.js";

export async function getAllUsers(req, res) {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUser(req, res) {
  try {
    const user = await getUserService(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createUser(req, res) {
  try {
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateUser(req, res) {
  try {
    const user = await updateUserService(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await deleteUserService(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function logIn(req, res) {
  try {
    const { email, password } = req.body;

    const result = await logInService(email, password);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
