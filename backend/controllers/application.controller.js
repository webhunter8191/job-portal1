import Application from '../models/application.model.js';
import Job from '../models/job.model.js';

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job Id is required", success: false
            });
        };
        //check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, user: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }
        //check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        //create a new application
        const newApplication = new Application({
            job: jobId,
            applicant: userId
        });
        job.applicants.push(userId);
        await job.save();
        return res.status(201).json({
            message: "Application submitted successfully",
            success: true
        });
    } catch (error) {
        console.log(error);

    }
}


export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { 'createdAt': -1 } },
            pupulate: {
                path: "company",
                options: { sort: { 'createdAt': -1 } }
            }

        })
        if (!application) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            });
        }
        return res.status(200).json({
            success: true,
            application,
        });
    } catch (error) {
        console.log(error);

    }
}