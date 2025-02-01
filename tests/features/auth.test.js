import { describe, expect, it, beforeEach, vi } from 'vitest'
import authService from '../../services/auth.service.js'
import userService from '../../services/user.service.js'
import bcrypt from 'bcrypt'

// Mock dependencies
vi.mock('../../services/user.service.js')
vi.mock('bcrypt')
vi.mock('../../models/user.model.js')
describe('Auth Service', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('register', () => {
        it('should register a new user successfully', async () => {
            const mockUser = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'hashedPassword123'
            }
            
            userService.getUserByEmail.mockResolvedValue(null)
            
            const result = await authService.register({
                name: mockUser.name,
                email: mockUser.email,
                password: mockUser.password
            })

            expect(result).toHaveProperty('user')
            expect(userService.getUserByEmail).toHaveBeenCalledWith(mockUser.email)
        })

        it('should throw error if email already exists', async () => {
            const existingUser = {
                email: 'existing@example.com'
            }
            
            userService.getUserByEmail.mockResolvedValue(existingUser)

            await expect(authService.register({
                name: 'Test',
                email: existingUser.email,
                password: 'password123'
            })).rejects.toThrow('Email already exists')
        })
    })

    describe('login', () => {
        it('should login user successfully', async () => {
            const mockUser = {
                id: 1,
                email: 'test@example.com',
                password: 'hashedPassword',
                is_verified: 1
            }

            userService.getUserByEmail.mockResolvedValue(mockUser)
            bcrypt.compare.mockResolvedValue(true)
            userService.updateLogin.mockResolvedValue({
                ...mockUser,
                password: undefined
            })

            const result = await authService.login({
                email: mockUser.email,
                password: 'password123'
            })

            expect(result).toHaveProperty('id', mockUser.id)
            expect(result.password).toBeUndefined()
        })

        it('should throw error for non-existent user', async () => {
            userService.getUserByEmail.mockResolvedValue(null)

            await expect(authService.login({
                email: 'nonexistent@example.com',
                password: 'password123'
            })).rejects.toThrow('Invalid email or password')
        })

        it('should throw error for invalid password', async () => {
            const mockUser = {
                email: 'test@example.com',
                password: 'hashedPassword'
            }

            userService.getUserByEmail.mockResolvedValue(mockUser)
            bcrypt.compare.mockResolvedValue(false)

            await expect(authService.login({
                email: mockUser.email,
                password: 'wrongpassword'
            })).rejects.toThrow('Invalid email or password')
        })

        it('should throw error for unverified user', async () => {
            const mockUser = {
                email: 'test@example.com',
                password: 'hashedPassword',
                is_verified: 0
            }

            userService.getUserByEmail.mockResolvedValue(mockUser)
            bcrypt.compare.mockResolvedValue(true)

            await expect(authService.login({
                email: mockUser.email,
                password: 'password123'
            })).rejects.toThrow('User is not verified')
        })
    })
})

