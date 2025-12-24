import { getUser as getUserModel, getUserByName as getUserByNameModel, getUserByEmail as getUserByEmailModel, getUserRoleById as getUserRoleByIdModel } from './control.model.mjs'

export async function getUser(req, res) {
	try {
		const { id } = req.params
		const userId = Number(id)
		if (!userId || Number.isNaN(userId)) {
			return res.status(400).json({ message: 'Invalid user id' })
		}

		const user = await getUserModel(userId)
		if (!user) return res.status(404).json({ message: 'User not found' })

		
		const result = {
			id: user.user_id,
			role_id: user.role_id,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			phone: user.phone,
			is_active: Boolean(user.is_active),
			created_at: user.created_at,
			updated_at: user.updated_at
		}

		return res.status(200).json(result)
	} catch (error) {
		console.error('getUser controller error:', error)
		return res.status(500).json({ message: 'Internal server error' })
	}
}

export async function getUserByName(req, res) {
	try {
		const { name } = req.params
		if (!name || typeof name !== 'string' || name.trim() === '') {
			return res.status(400).json({ message: 'Invalid name parameter' })
		}

		const user = await getUserByNameModel(name)
		if (!user) return res.status(404).json({ message: 'User not found' })

		const result = {
			id: user.user_id,
			role_id: user.role_id,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			phone: user.phone,
			is_active: Boolean(user.is_active),
			created_at: user.created_at,
			updated_at: user.updated_at
		}

		return res.status(200).json(result)
	} catch (error) {
		console.error('getUserByName controller error:', error)
		return res.status(500).json({ message: 'Internal server error' })
	}
}



export async function getUserByEmail(req, res) {
	try {
		const { email } = req.params
		if (!email || typeof email !== 'string' || email.trim() === '') {
			return res.status(400).json({ message: 'Invalid email parameter' })
		}

		const user = await getUserByEmailModel(email)
		if (!user) return res.status(404).json({ message: 'User not found' })

		const result = {
			id: user.user_id,
			role_id: user.role_id,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			phone: user.phone,
			password_hash: user.password_hash,
			is_active: Boolean(user.is_active),
			created_at: user.created_at,
			updated_at: user.updated_at
		}

		return res.status(200).json(result)
	} catch (error) {
		console.error('getUserByEmail controller error:', error)
		return res.status(500).json({ message: 'Internal server error' })
	}
}

export async function getUserRole(req, res) {
	try {
		const { id } = req.params
		const userId = Number(id)
		if (Number.isNaN(userId)) {
			return res.status(400).json({ message: 'Invalid user id' })
		}

		const user = await getUserRoleByIdModel(userId)
		if (!user) return res.status(404).json({ message: 'User not found' })

		const result = {
			role_id: user.role_id,
			first_name: user.first_name,
			last_name: user.last_name
		}

		return res.status(200).json(result)
	} catch (error) {
		console.error('getUserRole controller error:', error)
		return res.status(500).json({ message: 'Internal server error' })
	}
}

export default { getUser, getUserByName, getUserByEmail, getUserRole }

