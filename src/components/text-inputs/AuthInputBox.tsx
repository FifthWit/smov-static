import classNames from "classnames";

import { TextInputControl } from "./TextInputControl";

export function AuthInputBox(props: {
    value?: string;
    label?: string;
    name?: string;
    autoComplete?: string;
    placeholder?: string;
    onChange?: (data: string) => void;
    passwordToggleable?: boolean;
    className?: string;
}) {
    return (
        <div className={classNames("space-y-3", props.className)}>
            {props.label ? (
                <p className="font-bold text-foreground">{props.label}</p>
            ) : null}
            <TextInputControl
                name={props.name}
                value={props.value}
                autoComplete={props.autoComplete}
                onChange={props.onChange}
                placeholder={props.placeholder}
                passwordToggleable={props.passwordToggleable}
                className=""
            />
        </div>
    );
}
