import { FormlyFieldConfig } from "@ngx-formly/core";

const WRAPPER_NAME = "mat-suffix";

export function onPopulate(field: FormlyFieldConfig) {
  if (
    !field.templateOptions ||
    (field.wrappers && field.wrappers.indexOf(WRAPPER_NAME) !== -1)
  ) {
    return
  }

  if (field.templateOptions.matSuffix) {
    field.wrappers = [...(field.wrappers || []), WRAPPER_NAME]
  }
}
