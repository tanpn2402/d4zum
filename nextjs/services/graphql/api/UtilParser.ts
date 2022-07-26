import IBase from '@interfaces/IBase';
import BaseEntity from '@services/entity/Base.entity';

interface CustomHandler<T extends BaseEntity<Object>> {
  [field: string]: (p: T) => any
}

function UtilParser<T extends IBase, V extends BaseEntity<Object>>(p: V, customHandler?: CustomHandler<V>): T {
  let rlt: T = {} as T;
  if (!p) {
    return rlt;
  }
  rlt.id = p.id || null;

  Object.keys(p?.attributes || {}).forEach(field => {
    if (customHandler?.[field]) {
      rlt[field] = customHandler[field](p);
    }
    else {
      rlt[field] = p.attributes[field];
    }
  });

  return rlt;
}

export default UtilParser