/* eslint-disable */
import { Injectable } from '@angular/core';
import en from '../../../../assets/i18n/en';

export function GenericClass<Props>(): new () => Props {
  return class {} as any;
}

function concatIfExistsPath(path: string, suffix: string): string {
  return path ? `${path}.${suffix}` : suffix;
}

function transformObjectToPath<T extends object | string>(
  suffix: string,
  objectToTransformOrEndOfPath: T,
  path = '',
): T {
  return typeof objectToTransformOrEndOfPath === 'object'
    ? Object.entries(objectToTransformOrEndOfPath).reduce(
        (objectToTransform, [key, value]) => {
          objectToTransform[key] = transformObjectToPath(
            key,
            value,
            concatIfExistsPath(path, suffix),
          );

          return objectToTransform;
        },
        {} as T,
      )
    : (concatIfExistsPath(path, suffix) as T);
}

@Injectable()
export class TypedTranslateService extends GenericClass<typeof en>() {
  constructor() {
    super();
    Object.assign(this, transformObjectToPath('', en));
  }
}
