export function required(field_name: string) {
  return {required: true, message: `Please input ${field_name}`, trigger: 'blur'};
}

export function length(field: string, min: number, max: number, type = 'string') {
  return {type, min, max, message: `${field} length should be between ${min} to ${max}`, trigger: 'blur'}
}

export function email(field: string, required: boolean = true) {
  return {type: 'email', required, message: `${field} must be valid email address`, trigger: 'blur'}
}

export function number(field: string, min: number, max: number) {
  return {
    type: 'number',
    asyncValidator: (rule: any, value: number) => {
      return new Promise((resolve, reject) => {
        if (value < min) {
          reject(`${field} must be greater than ${min}`);
        } else if (value > max) {
          reject(`${field} must be less than ${max}`);
        } else {
          resolve(value);
        }
      });
    },
  }
}
