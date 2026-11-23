import React from 'react';
import { useStudio } from '../../context/StudioContext';
import {
  TextInputSimulator,
  EmailInputSimulator,
  PasswordInputSimulator,
  SearchInputSimulator,
  NumberInputSimulator,
  PhoneInputSimulator,
  TextareaSimulator,
} from './components/BasicInputComponents';
import {
  SelectDropdownSimulator,
  MultiSelectSimulator,
  CheckboxSimulator,
  RadioButtonSimulator,
  ToggleSwitchSimulator,
  RangeSliderSimulator,
  SearchableSelectSimulator,
} from './components/SelectionControlComponents';
import {
  DatePickerSimulator,
  TimePickerSimulator,
  ColorPickerSimulator,
  FileUploadSimulator,
  DragDropUploadSimulator,
  OtpInputSimulator,
} from './components/AdvancedPickerComponents';
import {
  FloatingLabelInputSimulator,
  InputWithIconSimulator,
  PasswordVisibilityToggleSimulator,
  FormValidationSimulator,
  InputErrorStateSimulator,
  InputSuccessStateSimulator,
} from './components/EnhancedStateComponents';

export const FormRenderer: React.FC = () => {
  const { activeComponent, activeVariantId } = useStudio();

  switch (activeComponent.id) {
    // 1. Basic Inputs
    case 'text-input':
      return <TextInputSimulator variantId={activeVariantId} />;
    case 'email-input':
      return <EmailInputSimulator variantId={activeVariantId} />;
    case 'password-input':
      return <PasswordInputSimulator variantId={activeVariantId} />;
    case 'search-input':
      return <SearchInputSimulator variantId={activeVariantId} />;
    case 'number-input':
      return <NumberInputSimulator variantId={activeVariantId} />;
    case 'phone-input':
      return <PhoneInputSimulator variantId={activeVariantId} />;
    case 'textarea-input':
      return <TextareaSimulator variantId={activeVariantId} />;

    // 2. Selection Controls
    case 'select-dropdown':
      return <SelectDropdownSimulator variantId={activeVariantId} />;
    case 'multi-select':
      return <MultiSelectSimulator variantId={activeVariantId} />;
    case 'checkbox-input':
      return <CheckboxSimulator variantId={activeVariantId} />;
    case 'radio-button':
      return <RadioButtonSimulator variantId={activeVariantId} />;
    case 'toggle-switch':
      return <ToggleSwitchSimulator variantId={activeVariantId} />;
    case 'range-slider':
      return <RangeSliderSimulator variantId={activeVariantId} />;
    case 'searchable-select':
      return <SearchableSelectSimulator variantId={activeVariantId} />;

    // 3. Advanced Pickers
    case 'date-picker':
      return <DatePickerSimulator variantId={activeVariantId} />;
    case 'time-picker':
      return <TimePickerSimulator variantId={activeVariantId} />;
    case 'color-picker':
      return <ColorPickerSimulator variantId={activeVariantId} />;
    case 'file-upload':
      return <FileUploadSimulator variantId={activeVariantId} />;
    case 'drag-drop-upload':
      return <DragDropUploadSimulator variantId={activeVariantId} />;
    case 'otp-input':
      return <OtpInputSimulator variantId={activeVariantId} />;

    // 4. Enhanced States
    case 'floating-label-input':
      return <FloatingLabelInputSimulator variantId={activeVariantId} />;
    case 'input-with-icon':
      return <InputWithIconSimulator variantId={activeVariantId} />;
    case 'password-visibility-toggle':
      return <PasswordVisibilityToggleSimulator variantId={activeVariantId} />;
    case 'form-validation':
      return <FormValidationSimulator variantId={activeVariantId} />;
    case 'input-error-state':
      return <InputErrorStateSimulator variantId={activeVariantId} />;
    case 'input-success-state':
      return <InputSuccessStateSimulator variantId={activeVariantId} />;

    default:
      return <TextInputSimulator variantId={activeVariantId} />;
  }
};
