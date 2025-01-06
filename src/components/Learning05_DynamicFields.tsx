import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from '@hookform/devtools';

let renderCount = 0
type FormValues = {
    username: string;
    email: string;
    channel: string;
    social: {
        facebook: string,
        twitter: string,
        instagram: string,
    };
    phoneNumbers: string[];
    phNUmbers: {
        number: string;
    }[];
}
const YoutubeForm = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            username: "ArnelRose",
            email: "",
            channel: "",
            social: {
                facebook: "",
                twitter: "",
                instagram: "",
            },
            phoneNumbers: ['', ''],
            phNUmbers: [{ number: '' }],
        },
    });
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const { fields, append, remove } = useFieldArray({
        name: 'phNUmbers',
        control
    });

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
                    })} />
                    <p className="error">{errors.email?.message}</p>
                </div>

                <div className="form-control">
                    <label htmlFor="channel">Channel</label>
                    <input type="text" id="channel" {...register("channel", {
                        required: {
                            value: true,
                            message: "Channel is required",
                        },
                    })} />
                    <p className="error">{errors.channel?.message}</p>
                </div>

                <div className="form-control">
                    <label htmlFor="facebook">Facebook</label>
                    <input type="text" id="facebook" {...register("social.facebook")} />
                </div>
                <div className="form-control">
                    <label htmlFor="twitter">Twitter</label>
                    <input type="text" id="twitter" {...register("social.twitter")} />
                </div>
                <div className="form-control">
                    <label htmlFor="instagram">Instagram</label>
                    <input type="text" id="instagram" {...register("social.instagram")} />
                </div>

                <div className="form-control">
                    <label htmlFor="primary-phone">Primary Phone Number</label>
                    <input type="text" id="primary-phone" {...register("phoneNumbers.0")} />
                </div>
                <div className="form-control">
                    <label htmlFor="secondary-phone">Secondary Phone Number</label>
                    <input type="text" id="secondary-phone" {...register("phoneNumbers.1")} />
                </div>

                <div>
                    <label htmlFor="">List of Phone Numbers</label>
                    <div>
                        {fields.map((field, index) => {
                            return (
                                <div className="form-control" key={field.id}>
                                    <input type="text" {...register(`phNUmbers.${index}.number` as const)} />
                                    {
                                        index > 0 && (
                                            <button type="button" onClick={() => remove(index)}>Remove</button>
                                        )
                                    }
                                </div>
                            );
                        })}
                        <button type="button" onClick={() => append({ number: "" })}>Add Phone Number</button>
                    </div>
                </div>
                <button>Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    );
};

export default YoutubeForm;
