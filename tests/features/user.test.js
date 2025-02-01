import { describe, expect, it, beforeEach, vi } from 'vitest'
import userService from '../../services/user.service.js'
import User from '../../models/user.model.js'

// Mock the User model
vi.mock('../../models/user.model.js', () => {
    const MockUser = function(data) {
        Object.assign(this, data);
        this.save = vi.fn().mockResolvedValue({ id: 1, ...data });
    };
    MockUser.findByEmail = vi.fn();
    MockUser.findById = vi.fn();
    MockUser.findAll = vi.fn();
    MockUser.findInactive = vi.fn();
    MockUser.findTopLoginUsers = vi.fn();
    return { default: MockUser };
})
 
describe('UserService', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('createUser', () => {
        it('should create user successfully', async () => {
            const userData = { name: 'Test User', email: 'new@example.com', password: 'password123' }
            User.findByEmail.mockResolvedValue(null)

            const result = await userService.createUser(userData)
            expect(result).toEqual(expect.objectContaining({
                id: 1,
                name: 'Test User',
                email: 'new@example.com'
            }))
        })
        
        it('should throw error if email already exists', async () => {
            const userData = { name: 'Test User', email: 'existing@example.com', password: 'password123' }
            User.findByEmail.mockResolvedValue({ email: userData.email })
            
            await expect(userService.createUser(userData))
                .rejects.toThrow('Email already exists')
        })
    })

    describe('getUserById', () => {
        it('should return user without password', async () => {
            const mockUser = { 
                id: 1, 
                name: 'Test User',
                email: 'test@example.com',
                password: 'hashedPassword'
            }
            User.findById.mockResolvedValue(mockUser)

            const result = await userService.getUserById(1)
            expect(result.password).toBeUndefined()
            expect(result).toEqual(expect.objectContaining({
                id: 1,
                name: 'Test User',
                email: 'test@example.com'
            }))
        })
    })

    describe('updateUser', () => {
        it('should update user successfully', async () => {
            const updates = { name: 'Updated Name' }
            const mockUser = {
                id: 1,
                name: 'Old Name',
                update: vi.fn().mockResolvedValue({ id: 1, name: 'Updated Name' })
            }
            User.findById.mockResolvedValue(mockUser)

            const result = await userService.updateUser(1, updates)
            expect(result.name).toBe('Updated Name')
            expect(mockUser.update).toHaveBeenCalled()
        })
    })

    describe('verifyUser', () => {
        it('should verify user successfully', async () => {
            const mockUser = {
                email: 'test@example.com',
                is_verified: false,
                update: vi.fn().mockResolvedValue({ is_verified: true })
            }
            User.findByEmail.mockResolvedValue(mockUser)

            const result = await userService.verifyUser('test@example.com')
            expect(mockUser.is_verified).toBe(true)
            expect(mockUser.update).toHaveBeenCalled()
        })
    })

    describe('getAllUsers', () => {
        it('should fetch users with pagination and filters', async () => {
            const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }]
            const filters = { name: 'User', is_verified: true }
            User.findAll.mockResolvedValue(mockUsers)

            const result = await userService.getAllUsers(1, 10, filters)
            expect(result).toEqual(mockUsers)
            expect(User.findAll).toHaveBeenCalledWith(1, 10, filters)
        })
    })
})
