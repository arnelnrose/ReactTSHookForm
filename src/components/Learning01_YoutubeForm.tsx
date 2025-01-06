import { useForm } from "react-hook-form";
import { DevTool } from '@hookform/devtools';

let renderCount = 0
type FormValues = {
    username: string,
    email: string,
    channel: string,
}
const YoutubeForm = () => {
    const form = useForm<FormValues>();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data: FormValues) => {
        console.log('Form Submitted', data);
    };

    renderCount++;
    return (
        <div>
            <h1>Youtube Form ({renderCount / 2})</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-control">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" {...register("username", {
                        required: {
                            value: true,
                            message: "Username is required",
                        },
                        minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters long",
                        },
                        maxLength: {
                            value: 10,
                            message: "Username must be at most 10 characters long",
                        },
                    })} />
                    <p className="error">{errors.username?.message}</p>
                </div>

                <div className="form-control">
                    <label htmlFor="username">Email</label>
                    <input type="email" id="email" {...register("email", {
                        required: {
                            value: true,
                            message: "Email is required",
                        },
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                            message: "Invalid email format",
                        },
                        validate: {
                            notADmin: (fieldValue) => {
                                return (
                                    fieldValue !== "admin@example.com" ||
                                    "Enter a different emaill address"
                                );
                            },
                            notBlockListed: (fieldValue) => {
                                return !fieldValue.endsWith("baddomain.com") || 
                                "This domain is not supported"
                            }
                        }
                        // validate: (fieldValue) => {
                        //     return (
                        //         fieldValue !== "admin@example.com" ||
                        //         "Enter a different emaill address"
                        //     )
                        // },
                    })} />
                    <p className="error">{errors.email?.message}</p>
                </div>

                <div className="form-control">
                    <label htmlFor="password">Channel</label>
                    <input type="text" id="channel" {...register("channel", {
                        required: {
                            value: true,
                            message: "Channel is required",
                        },
                    })} />
                    <p className="error">{errors.channel?.message}</p>
                </div>

                <button>Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    );
};

export default YoutubeForm;
