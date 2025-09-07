// scripts/seedAdmin.ts
import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { z } from 'zod';
const prisma = new PrismaClient();
// Validation schemas using Zod
const AdminDataSchema = z.object({
    email: z.string().email('Invalid email format'),
    firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
    lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
    phone: z.string().optional().nullable(),
    avatar: z.string().url('Invalid avatar URL').optional().nullable(),
    department: z.string().max(100, 'Department name too long').optional(),
    permissions: z.array(z.string()).optional(),
});
const EnvironmentSchema = z.object({
    EMAIL_USER: z.string().email('EMAIL_USER must be a valid email'),
    EMAIL_PASSWORD: z.string().min(1, 'EMAIL_PASSWORD is required'),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    ADMIN_EMAIL: z.string().email().optional(),
    ADMIN_FIRST_NAME: z.string().optional(),
    ADMIN_LAST_NAME: z.string().optional(),
    ADMIN_PHONE: z.string().optional(),
    ADMIN_AVATAR: z.string().url().optional(),
    ADMIN_DEPARTMENT: z.string().optional(),
    FRONTEND_URL: z.string().url().optional(),
    NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
});
// Validate environment variables
function validateEnvironment() {
    try {
        return EnvironmentSchema.parse(process.env);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            console.error('❌ Environment validation failed:');
        }
        throw error;
    }
}
// Email service function for admin credentials
async function sendAdminCredentialsEmail(email, userName, loginEmail, password) {
    const env = validateEnvironment();
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: env.EMAIL_USER,
                pass: env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: env.EMAIL_USER,
            to: email,
            subject: 'Tourlity - Admin Account Created',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2196F3, #42A5F5); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">Tourlity</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Admin Account Created</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Hello ${userName}!</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              Your administrator account for Tourlity has been successfully created. Below are your login credentials:
            </p>
            
            <div style="background: white; border: 2px solid #2196F3; border-radius: 10px; padding: 25px; margin: 25px 0;">
              <h3 style="color: #333; margin: 0 0 20px 0; font-size: 18px;">🔐 Login Credentials</h3>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #333;">Email:</strong>
                <div style="background: #f5f5f5; padding: 10px; border-radius: 5px; margin-top: 5px; font-family: monospace;">
                  ${loginEmail}
                </div>
              </div>
              
              <div style="margin-bottom: 15px;">
                <strong style="color: #333;">Password:</strong>
                <div style="background: #f5f5f5; padding: 10px; border-radius: 5px; margin-top: 5px; font-family: monospace; letter-spacing: 1px;">
                  ${password}
                </div>
              </div>
              
              <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin-top: 20px;">
                <p style="color: #856404; margin: 0; font-size: 14px;">
                  ⚠️ <strong>Important:</strong> Please change your password after your first login for security purposes.
                </p>
              </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${env.FRONTEND_URL || 'https://tourlity.com'}/admin/login" 
                 style="background: #2196F3; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Login to Admin Panel
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              As an administrator, you have access to manage users, tours, bookings, and system settings. Please keep your credentials secure.
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #999; font-size: 14px;">
                Need help? Contact us at <a href="mailto:support@tourlity.com" style="color: #2196F3;">support@tourlity.com</a>
              </p>
            </div>
          </div>
          
          <div style="background: #333; padding: 20px; text-align: center; color: white;">
            <p style="margin: 0; font-size: 14px;">© 2024 Tourlity. All rights reserved.</p>
          </div>
        </div>
      `,
        };
        await transporter.sendMail(mailOptions);
        console.log('✅ Admin credentials email sent successfully to:', email);
        return { success: true };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('❌ Error sending admin credentials email:', errorMessage);
        return { success: false, error: errorMessage };
    }
}
// Generate a random secure password
function generateSecurePassword(length = 14) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*';
    let password = '';
    // Ensure at least one of each character type
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }
    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
}
// Default admin permissions
const DEFAULT_ADMIN_PERMISSIONS = [
    'USER_MANAGEMENT',
    'TOUR_MANAGEMENT',
    'BOOKING_MANAGEMENT',
    'REVIEW_MANAGEMENT',
    'MESSAGE_MANAGEMENT',
    'NOTIFICATION_MANAGEMENT',
    'ANALYTICS_VIEW',
    'SYSTEM_SETTINGS',
    'ADMIN_MANAGEMENT',
    'FINANCIAL_MANAGEMENT'
];
// Create admin user
async function createAdmin(adminData) {
    try {
        console.log('🚀 Starting admin creation process...');
        // Validate admin data
        const validatedData = AdminDataSchema.parse(adminData);
        // Check if admin already exists
        const existingAdmin = await prisma.user.findUnique({
            where: { email: validatedData.email }
        });
        if (existingAdmin) {
            console.log('❌ Admin with this email already exists');
            return {
                success: false,
                message: 'Admin with this email already exists'
            };
        }
        // Generate secure password
        const plainPassword = generateSecurePassword(14);
        const hashedPassword = await bcrypt.hash(plainPassword, 12);
        // Create admin user with profile in a transaction
        const admin = await prisma.$transaction(async (tx) => {
            // Create the user
            const newUser = await tx.user.create({
                data: {
                    email: validatedData.email,
                    password: hashedPassword,
                    firstName: validatedData.firstName,
                    lastName: validatedData.lastName,
                    phone: validatedData.phone,
                    avatar: validatedData.avatar,
                    role: UserRole.ADMIN,
                    status: UserStatus.ACTIVE,
                    emailVerified: true,
                    emailVerifiedAt: new Date(),
                }
            });
            // Create admin profile
            const adminProfile = await tx.adminProfile.create({
                data: {
                    userId: newUser.id,
                    permissions: validatedData.permissions || [...DEFAULT_ADMIN_PERMISSIONS],
                    department: validatedData.department || 'General Administration'
                }
            });
            return { user: newUser, profile: adminProfile };
        });
        console.log('✅ Admin user created successfully');
        // Send credentials email
        console.log('📧 Sending login credentials email...');
        const emailResult = await sendAdminCredentialsEmail(admin.user.email, `${admin.user.firstName} ${admin.user.lastName}`, admin.user.email, plainPassword);
        if (emailResult.success) {
            console.log('✅ Login credentials sent successfully');
        }
        else {
            console.log('⚠️  Admin created but email sending failed:', emailResult.error);
            // Log the password securely for manual delivery in development
            if (process.env.NODE_ENV === 'development') {
                console.log('🔑 IMPORTANT - Save this password securely:', plainPassword);
            }
        }
        const result = {
            success: true,
            admin: {
                id: admin.user.id,
                email: admin.user.email,
                firstName: admin.user.firstName,
                lastName: admin.user.lastName,
                role: admin.user.role,
                status: admin.user.status
            },
            emailSent: emailResult.success
        };
        // Only include password in development
        if (process.env.NODE_ENV === 'development') {
            result.tempPassword = plainPassword;
        }
        return result;
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            console.error('❌ Validation error:', error.message);
            return {
                success: false,
                message: error.message
            };
        }
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('❌ Error creating admin:', errorMessage);
        throw error;
    }
}
// Main seeding function
async function seedAdmin() {
    try {
        // Validate environment first
        const env = validateEnvironment();
        // Admin data with type safety
        const adminData = {
            email: env.ADMIN_EMAIL || 'admin@tourlity.com',
            firstName: env.ADMIN_FIRST_NAME || 'Super',
            lastName: env.ADMIN_LAST_NAME || 'Admin',
            phone: env.ADMIN_PHONE || null,
            avatar: env.ADMIN_AVATAR || null,
            department: env.ADMIN_DEPARTMENT || 'System Administration',
            permissions: [...DEFAULT_ADMIN_PERMISSIONS]
        };
        console.log('🔧 Seeding admin user...');
        console.log('📋 Admin Data:', {
            email: adminData.email,
            firstName: adminData.firstName,
            lastName: adminData.lastName,
            department: adminData.department
        });
        const result = await createAdmin(adminData);
        if (result.success && result.admin) {
            console.log('🎉 Admin seeding completed successfully!');
            console.log('👤 Admin Details:', result.admin);
            if (!result.emailSent) {
                console.log('⚠️  IMPORTANT: Email sending failed. Please manually share the login credentials.');
                if (result.tempPassword) {
                    console.log('🔐 Temporary Password:', result.tempPassword);
                }
            }
        }
        else {
            console.log('❌ Admin seeding failed:', result.message);
            process.exit(1);
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('💥 Seeding process failed:', errorMessage);
        process.exit(1);
    }
    finally {
        await prisma.$disconnect();
        console.log('🔌 Database connection closed');
    }
}
// Command line argument handling with type safety
function handleCommandLineArgs() {
    const args = process.argv.slice(2);
    if (args.includes('--help') || args.includes('-h')) {
        console.log(`
🔧 Admin Seeding Script Usage:

Environment Variables:
  ADMIN_EMAIL         - Admin email address (must be valid email)
  ADMIN_FIRST_NAME    - Admin first name (1-50 characters)
  ADMIN_LAST_NAME     - Admin last name (1-50 characters)
  ADMIN_PHONE         - Admin phone number (optional)
  ADMIN_AVATAR        - Admin avatar URL (optional, must be valid URL)
  ADMIN_DEPARTMENT    - Admin department (optional, max 100 characters)
  
Required Environment Variables:
  EMAIL_USER          - Email service user (must be valid email)
  EMAIL_PASSWORD      - Email service password
  DATABASE_URL        - Database connection string

Examples:
  # Using environment variables
  ADMIN_EMAIL=john@tourlity.com ADMIN_FIRST_NAME=John ADMIN_LAST_NAME=Doe npm run seed:admin
  
  # Using default values
  npm run seed:admin

Note: All inputs are validated for type safety and proper formats.
    `);
        process.exit(0);
    }
}
// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
    handleCommandLineArgs();
    seedAdmin().catch((error) => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}
export { createAdmin, seedAdmin };
