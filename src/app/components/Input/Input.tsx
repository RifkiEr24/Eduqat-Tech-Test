import { Input } from "@nextui-org/react";

type InputProps = {
        key: string,
        value: string,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        type: string,
        label: string,
        className?: string // Make className optional
};


export default function CustomInput({  ...props }: InputProps) {
    return (
        <div className={`flex flex-col gap-2 w-full text-sm text-tertiary ${props.className}` }>
            <Input
                key={props.key}
                value={props.value}
                onChange={props.onChange}
                type={props.type}
                label={props.label}
                classNames={{
                    label: "text-tertiary",
                    input: [
                      "bg-transparent",
                      "text-base-text",
                      "placeholder:text-default-700/50",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                      "!bg-white",
                      "border border-tertiary",
                      "group-data-[focused=true]:!border-primary",
                      "backdrop-blur-xl",
                      "backdrop-saturate-200",
                      "hover:bg-default-200/70",
                      "!cursor-text",
                    ],
                  }}
            />
        </div>
    );
}
