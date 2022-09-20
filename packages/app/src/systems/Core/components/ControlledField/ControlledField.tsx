/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ThemeUtilsCSS } from "@fuel-ui/css";
import { Form } from "@fuel-ui/react";
import type { ReactElement, ReactNode } from "react";
import { useId } from "react";
import type {
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  UseFormStateReturn,
} from "react-hook-form";
import { Controller } from "react-hook-form";

type RenderProps = {
  field: ControllerRenderProps & { id: string };
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<any>;
};

export type ControlledFieldProps = Omit<ControllerProps<any>, "render"> & {
  css?: ThemeUtilsCSS;
  label?: ReactNode;
  labelSide?: "left" | "right";
  isRequired?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  render: (props: RenderProps) => ReactElement;
  hideError?: boolean;
};

export function ControlledField({
  css,
  label,
  labelSide = "left",
  name,
  control,
  render,
  isRequired,
  isInvalid,
  isDisabled,
  isReadOnly,
  hideError,
}: ControlledFieldProps) {
  const id = useId();
  return (
    <Controller
      name={name}
      control={control}
      render={(props) => {
        const controlProps = {
          css,
          isRequired,
          isDisabled,
          isReadOnly,
          isInvalid: isInvalid || Boolean(props.fieldState.error),
        };
        return (
          <Form.Control {...controlProps}>
            {label && labelSide === "left" && (
              <Form.Label htmlFor={id}>{label}</Form.Label>
            )}
            {render({ ...props, field: { ...props.field, id } })}
            {label && labelSide === "right" && (
              <Form.Label htmlFor={id}>{label}</Form.Label>
            )}
            {!hideError && props.fieldState.error && (
              <Form.ErrorMessage aria-label="Error message">
                {props.fieldState.error.message}
              </Form.ErrorMessage>
            )}
          </Form.Control>
        );
      }}
    />
  );
}