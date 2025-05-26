import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
// import mongoose from 'mongoose';

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "something is missing",
                success: "false",
            })
        };
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: 'User already exists with this email',
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        })
        return res.status(201).json({
            message: 'Account created successfully',
            success: true,
        })
    } catch (error) {
        console.log(error)
    }

}


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            res.status(400).json({
                message: "something is missing",
                success: false,
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: "Invalid email or password",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(400).json({
                message: "Invalid email or password",
                success: false,
            })
        }
        // check role is valid or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doen't exist with this role.",
                success: false,
            })
        };
        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,

        }
        res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `welcome back ${user.fullname}`,
            user,
            success: true,
        })
    } catch (error) {
        console.log(error)
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out succesfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        // if (!fullname || !email || !phoneNumber || !bio || !skills) {
        //     return res.status(400).json({
        //         message: "something is missing",
        //         success: "false",
        //     })
        // };

        //cloudinary ...


        let skillsArray;
        if (skills) {

            skillsArray = skills.split(",");
        }
        const userId = req.id // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            })
        }
        //updating data
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (skills) user.profile.skills = profile.skills
        if (bio) user.profile.bio = profile.bio

        //resume pending...
        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }

        return res.status(200).json({
            message: "Profile updated succesfully",
            user,
            success: true
        })

    } catch (error) {
        console.log(error)
    }

}

