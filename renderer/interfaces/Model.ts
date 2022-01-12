export interface ArchitectureOption {
    value: string;
    label: string;
}

export interface SelectedModelType extends ArchitectureOption {
}

export interface SelectedModels {
    model_a?: SelectedModelType
    model_b?: SelectedModelType
}

export interface ModelType {
    value: SelectedModelType;
    target: string;
}
