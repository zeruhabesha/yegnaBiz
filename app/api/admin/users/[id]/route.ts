import { NextRequest, NextResponse } from 'next/server'
import { deleteAdminUser, getAdminUserById, updateAdminUser } from '@/lib/data/users'
import { requireAdminForDynamic } from '@/lib/auth-middleware'

// GET /api/admin/users/[id] - Get single user (Admin only)
export const GET = requireAdminForDynamic(async (
  request: NextRequest,
  _user,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params

    const user = await getAdminUserById(Number(id))

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
})

// PUT /api/admin/users/[id] - Update user (Admin only)
export const PUT = requireAdminForDynamic(async (
  request: NextRequest,
  _user,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params
    const body = await request.json()
    const { full_name, email, role, status, phone, location } = body

    const updated = await updateAdminUser(Number(id), { full_name, email, role, status, phone, location })

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updated
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    )
  }
})

// DELETE /api/admin/users/[id] - Delete user (Admin only)
export const DELETE = requireAdminForDynamic(async (
  request: NextRequest,
  _user,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params

    // Check if user exists
    const deleted = await deleteAdminUser(Number(id))
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete user' },
      { status: 500 }
    )
  }
})
