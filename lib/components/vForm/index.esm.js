import { defineComponent, ref, onMounted, watch, resolveComponent, openBlock, createElementBlock, unref, createBlock, mergeProps, withCtx, Fragment, renderList, resolveDynamicComponent, createCommentVNode, renderSlot, createVNode, nextTick } from "vue";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear$1;
function eq$2(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_1 = eq$2;
var eq$1 = eq_1;
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf$4;
var assocIndexOf$3 = _assocIndexOf;
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete$1(key) {
  var data = this.__data__, index2 = assocIndexOf$3(data, key);
  if (index2 < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index2 == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index2, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete = listCacheDelete$1;
var assocIndexOf$2 = _assocIndexOf;
function listCacheGet$1(key) {
  var data = this.__data__, index2 = assocIndexOf$2(data, key);
  return index2 < 0 ? void 0 : data[index2][1];
}
var _listCacheGet = listCacheGet$1;
var assocIndexOf$1 = _assocIndexOf;
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas$1;
var assocIndexOf = _assocIndexOf;
function listCacheSet$1(key, value) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  if (index2 < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index2][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet$1;
var listCacheClear = _listCacheClear, listCacheDelete = _listCacheDelete, listCacheGet = _listCacheGet, listCacheHas = _listCacheHas, listCacheSet = _listCacheSet;
function ListCache$4(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
ListCache$4.prototype.clear = listCacheClear;
ListCache$4.prototype["delete"] = listCacheDelete;
ListCache$4.prototype.get = listCacheGet;
ListCache$4.prototype.has = listCacheHas;
ListCache$4.prototype.set = listCacheSet;
var _ListCache = ListCache$4;
var ListCache$3 = _ListCache;
function stackClear$1() {
  this.__data__ = new ListCache$3();
  this.size = 0;
}
var _stackClear = stackClear$1;
function stackDelete$1(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var _stackDelete = stackDelete$1;
function stackGet$1(key) {
  return this.__data__.get(key);
}
var _stackGet = stackGet$1;
function stackHas$1(key) {
  return this.__data__.has(key);
}
var _stackHas = stackHas$1;
var freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal$1;
var freeGlobal = _freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root$8 = freeGlobal || freeSelf || Function("return this")();
var _root = root$8;
var root$7 = _root;
var Symbol$4 = root$7.Symbol;
var _Symbol = Symbol$4;
var Symbol$3 = _Symbol;
var objectProto$c = Object.prototype;
var hasOwnProperty$9 = objectProto$c.hasOwnProperty;
var nativeObjectToString$1 = objectProto$c.toString;
var symToStringTag$1 = Symbol$3 ? Symbol$3.toStringTag : void 0;
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$9.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var _getRawTag = getRawTag$1;
var objectProto$b = Object.prototype;
var nativeObjectToString = objectProto$b.toString;
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}
var _objectToString = objectToString$1;
var Symbol$2 = _Symbol, getRawTag = _getRawTag, objectToString = _objectToString;
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag$4(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
var _baseGetTag = baseGetTag$4;
function isObject$5(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_1 = isObject$5;
var baseGetTag$3 = _baseGetTag, isObject$4 = isObject_1;
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$2(value) {
  if (!isObject$4(value)) {
    return false;
  }
  var tag = baseGetTag$3(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var isFunction_1 = isFunction$2;
var root$6 = _root;
var coreJsData$1 = root$6["__core-js_shared__"];
var _coreJsData = coreJsData$1;
var coreJsData = _coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked$1(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var _isMasked = isMasked$1;
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource$2(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var _toSource = toSource$2;
var isFunction$1 = isFunction_1, isMasked = _isMasked, isObject$3 = isObject_1, toSource$1 = _toSource;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$a = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty$8).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function baseIsNative$1(value) {
  if (!isObject$3(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource$1(value));
}
var _baseIsNative = baseIsNative$1;
function getValue$1(object, key) {
  return object == null ? void 0 : object[key];
}
var _getValue = getValue$1;
var baseIsNative = _baseIsNative, getValue = _getValue;
function getNative$7(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var _getNative = getNative$7;
var getNative$6 = _getNative, root$5 = _root;
var Map$3 = getNative$6(root$5, "Map");
var _Map = Map$3;
var getNative$5 = _getNative;
var nativeCreate$4 = getNative$5(Object, "create");
var _nativeCreate = nativeCreate$4;
var nativeCreate$3 = _nativeCreate;
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}
var _hashClear = hashClear$1;
function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete = hashDelete$1;
var nativeCreate$2 = _nativeCreate;
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$9 = Object.prototype;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$7.call(data, key) ? data[key] : void 0;
}
var _hashGet = hashGet$1;
var nativeCreate$1 = _nativeCreate;
var objectProto$8 = Object.prototype;
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$6.call(data, key);
}
var _hashHas = hashHas$1;
var nativeCreate = _nativeCreate;
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
var _hashSet = hashSet$1;
var hashClear = _hashClear, hashDelete = _hashDelete, hashGet = _hashGet, hashHas = _hashHas, hashSet = _hashSet;
function Hash$1(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
Hash$1.prototype.clear = hashClear;
Hash$1.prototype["delete"] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;
var _Hash = Hash$1;
var Hash = _Hash, ListCache$2 = _ListCache, Map$2 = _Map;
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$2 || ListCache$2)(),
    "string": new Hash()
  };
}
var _mapCacheClear = mapCacheClear$1;
function isKeyable$1(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var _isKeyable = isKeyable$1;
var isKeyable = _isKeyable;
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var _getMapData = getMapData$4;
var getMapData$3 = _getMapData;
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete = mapCacheDelete$1;
var getMapData$2 = _getMapData;
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}
var _mapCacheGet = mapCacheGet$1;
var getMapData$1 = _getMapData;
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}
var _mapCacheHas = mapCacheHas$1;
var getMapData = _getMapData;
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet$1;
var mapCacheClear = _mapCacheClear, mapCacheDelete = _mapCacheDelete, mapCacheGet = _mapCacheGet, mapCacheHas = _mapCacheHas, mapCacheSet = _mapCacheSet;
function MapCache$1(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
MapCache$1.prototype.clear = mapCacheClear;
MapCache$1.prototype["delete"] = mapCacheDelete;
MapCache$1.prototype.get = mapCacheGet;
MapCache$1.prototype.has = mapCacheHas;
MapCache$1.prototype.set = mapCacheSet;
var _MapCache = MapCache$1;
var ListCache$1 = _ListCache, Map$1 = _Map, MapCache = _MapCache;
var LARGE_ARRAY_SIZE = 200;
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var _stackSet = stackSet$1;
var ListCache = _ListCache, stackClear = _stackClear, stackDelete = _stackDelete, stackGet = _stackGet, stackHas = _stackHas, stackSet = _stackSet;
function Stack$1(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack$1.prototype.clear = stackClear;
Stack$1.prototype["delete"] = stackDelete;
Stack$1.prototype.get = stackGet;
Stack$1.prototype.has = stackHas;
Stack$1.prototype.set = stackSet;
var _Stack = Stack$1;
function arrayEach$1(array, iteratee) {
  var index2 = -1, length = array == null ? 0 : array.length;
  while (++index2 < length) {
    if (iteratee(array[index2], index2, array) === false) {
      break;
    }
  }
  return array;
}
var _arrayEach = arrayEach$1;
var getNative$4 = _getNative;
var defineProperty$1 = function() {
  try {
    var func = getNative$4(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var _defineProperty = defineProperty$1;
var defineProperty = _defineProperty;
function baseAssignValue$2(object, key, value) {
  if (key == "__proto__" && defineProperty) {
    defineProperty(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var _baseAssignValue = baseAssignValue$2;
var baseAssignValue$1 = _baseAssignValue, eq = eq_1;
var objectProto$7 = Object.prototype;
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
function assignValue$2(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$5.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue$1(object, key, value);
  }
}
var _assignValue = assignValue$2;
var assignValue$1 = _assignValue, baseAssignValue = _baseAssignValue;
function copyObject$4(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index2 = -1, length = props.length;
  while (++index2 < length) {
    var key = props[index2];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue$1(object, key, newValue);
    }
  }
  return object;
}
var _copyObject = copyObject$4;
function baseTimes$1(n, iteratee) {
  var index2 = -1, result = Array(n);
  while (++index2 < n) {
    result[index2] = iteratee(index2);
  }
  return result;
}
var _baseTimes = baseTimes$1;
function isObjectLike$5(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike$5;
var baseGetTag$2 = _baseGetTag, isObjectLike$4 = isObjectLike_1;
var argsTag$2 = "[object Arguments]";
function baseIsArguments$1(value) {
  return isObjectLike$4(value) && baseGetTag$2(value) == argsTag$2;
}
var _baseIsArguments = baseIsArguments$1;
var baseIsArguments = _baseIsArguments, isObjectLike$3 = isObjectLike_1;
var objectProto$6 = Object.prototype;
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;
var isArguments$1 = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike$3(value) && hasOwnProperty$4.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
var isArguments_1 = isArguments$1;
var isArray$3 = Array.isArray;
var isArray_1 = isArray$3;
var isBuffer$2 = { exports: {} };
function stubFalse() {
  return false;
}
var stubFalse_1 = stubFalse;
(function(module, exports) {
  var root2 = _root, stubFalse2 = stubFalse_1;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? root2.Buffer : void 0;
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
  var isBuffer2 = nativeIsBuffer || stubFalse2;
  module.exports = isBuffer2;
})(isBuffer$2, isBuffer$2.exports);
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex$1(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var _isIndex = isIndex$1;
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength$2(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var isLength_1 = isLength$2;
var baseGetTag$1 = _baseGetTag, isLength$1 = isLength_1, isObjectLike$2 = isObjectLike_1;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$1 = "[object Error]", funcTag$1 = "[object Function]", mapTag$4 = "[object Map]", numberTag$2 = "[object Number]", objectTag$2 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$2 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray$1(value) {
  return isObjectLike$2(value) && isLength$1(value.length) && !!typedArrayTags[baseGetTag$1(value)];
}
var _baseIsTypedArray = baseIsTypedArray$1;
function baseUnary$3(func) {
  return function(value) {
    return func(value);
  };
}
var _baseUnary = baseUnary$3;
var _nodeUtil = { exports: {} };
(function(module, exports) {
  var freeGlobal2 = _freeGlobal;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal2.process;
  var nodeUtil2 = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  module.exports = nodeUtil2;
})(_nodeUtil, _nodeUtil.exports);
var baseIsTypedArray = _baseIsTypedArray, baseUnary$2 = _baseUnary, nodeUtil$2 = _nodeUtil.exports;
var nodeIsTypedArray = nodeUtil$2 && nodeUtil$2.isTypedArray;
var isTypedArray$1 = nodeIsTypedArray ? baseUnary$2(nodeIsTypedArray) : baseIsTypedArray;
var isTypedArray_1 = isTypedArray$1;
var baseTimes = _baseTimes, isArguments = isArguments_1, isArray$2 = isArray_1, isBuffer$1 = isBuffer$2.exports, isIndex = _isIndex, isTypedArray = isTypedArray_1;
var objectProto$5 = Object.prototype;
var hasOwnProperty$3 = objectProto$5.hasOwnProperty;
function arrayLikeKeys$2(value, inherited) {
  var isArr = isArray$2(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$3.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var _arrayLikeKeys = arrayLikeKeys$2;
var objectProto$4 = Object.prototype;
function isPrototype$3(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$4;
  return value === proto;
}
var _isPrototype = isPrototype$3;
function overArg$2(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var _overArg = overArg$2;
var overArg$1 = _overArg;
var nativeKeys$1 = overArg$1(Object.keys, Object);
var _nativeKeys = nativeKeys$1;
var isPrototype$2 = _isPrototype, nativeKeys = _nativeKeys;
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function baseKeys$1(object) {
  if (!isPrototype$2(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$2.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var _baseKeys = baseKeys$1;
var isFunction = isFunction_1, isLength = isLength_1;
function isArrayLike$2(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
var isArrayLike_1 = isArrayLike$2;
var arrayLikeKeys$1 = _arrayLikeKeys, baseKeys = _baseKeys, isArrayLike$1 = isArrayLike_1;
function keys$3(object) {
  return isArrayLike$1(object) ? arrayLikeKeys$1(object) : baseKeys(object);
}
var keys_1 = keys$3;
var copyObject$3 = _copyObject, keys$2 = keys_1;
function baseAssign$1(object, source) {
  return object && copyObject$3(source, keys$2(source), object);
}
var _baseAssign = baseAssign$1;
function nativeKeysIn$1(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var _nativeKeysIn = nativeKeysIn$1;
var isObject$2 = isObject_1, isPrototype$1 = _isPrototype, nativeKeysIn = _nativeKeysIn;
var objectProto$2 = Object.prototype;
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
function baseKeysIn$1(object) {
  if (!isObject$2(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype$1(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$1.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var _baseKeysIn = baseKeysIn$1;
var arrayLikeKeys = _arrayLikeKeys, baseKeysIn = _baseKeysIn, isArrayLike = isArrayLike_1;
function keysIn$3(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var keysIn_1 = keysIn$3;
var copyObject$2 = _copyObject, keysIn$2 = keysIn_1;
function baseAssignIn$1(object, source) {
  return object && copyObject$2(source, keysIn$2(source), object);
}
var _baseAssignIn = baseAssignIn$1;
var _cloneBuffer = { exports: {} };
(function(module, exports) {
  var root2 = _root;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? root2.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
  function cloneBuffer2(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  module.exports = cloneBuffer2;
})(_cloneBuffer, _cloneBuffer.exports);
function copyArray$1(source, array) {
  var index2 = -1, length = source.length;
  array || (array = Array(length));
  while (++index2 < length) {
    array[index2] = source[index2];
  }
  return array;
}
var _copyArray = copyArray$1;
function arrayFilter$1(array, predicate) {
  var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index2 < length) {
    var value = array[index2];
    if (predicate(value, index2, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var _arrayFilter = arrayFilter$1;
function stubArray$2() {
  return [];
}
var stubArray_1 = stubArray$2;
var arrayFilter = _arrayFilter, stubArray$1 = stubArray_1;
var objectProto$1 = Object.prototype;
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols$3 = !nativeGetSymbols$1 ? stubArray$1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var _getSymbols = getSymbols$3;
var copyObject$1 = _copyObject, getSymbols$2 = _getSymbols;
function copySymbols$1(source, object) {
  return copyObject$1(source, getSymbols$2(source), object);
}
var _copySymbols = copySymbols$1;
function arrayPush$2(array, values) {
  var index2 = -1, length = values.length, offset = array.length;
  while (++index2 < length) {
    array[offset + index2] = values[index2];
  }
  return array;
}
var _arrayPush = arrayPush$2;
var overArg = _overArg;
var getPrototype$2 = overArg(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype$2;
var arrayPush$1 = _arrayPush, getPrototype$1 = _getPrototype, getSymbols$1 = _getSymbols, stubArray = stubArray_1;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn$2 = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush$1(result, getSymbols$1(object));
    object = getPrototype$1(object);
  }
  return result;
};
var _getSymbolsIn = getSymbolsIn$2;
var copyObject = _copyObject, getSymbolsIn$1 = _getSymbolsIn;
function copySymbolsIn$1(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}
var _copySymbolsIn = copySymbolsIn$1;
var arrayPush = _arrayPush, isArray$1 = isArray_1;
function baseGetAllKeys$2(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
var _baseGetAllKeys = baseGetAllKeys$2;
var baseGetAllKeys$1 = _baseGetAllKeys, getSymbols = _getSymbols, keys$1 = keys_1;
function getAllKeys$1(object) {
  return baseGetAllKeys$1(object, keys$1, getSymbols);
}
var _getAllKeys = getAllKeys$1;
var baseGetAllKeys = _baseGetAllKeys, getSymbolsIn = _getSymbolsIn, keysIn$1 = keysIn_1;
function getAllKeysIn$1(object) {
  return baseGetAllKeys(object, keysIn$1, getSymbolsIn);
}
var _getAllKeysIn = getAllKeysIn$1;
var getNative$3 = _getNative, root$4 = _root;
var DataView$1 = getNative$3(root$4, "DataView");
var _DataView = DataView$1;
var getNative$2 = _getNative, root$3 = _root;
var Promise$2 = getNative$2(root$3, "Promise");
var _Promise = Promise$2;
var getNative$1 = _getNative, root$2 = _root;
var Set$1 = getNative$1(root$2, "Set");
var _Set = Set$1;
var getNative = _getNative, root$1 = _root;
var WeakMap$1 = getNative(root$1, "WeakMap");
var _WeakMap = WeakMap$1;
var DataView = _DataView, Map = _Map, Promise$1 = _Promise, Set = _Set, WeakMap = _WeakMap, baseGetTag = _baseGetTag, toSource = _toSource;
var mapTag$3 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
var getTag$3 = baseGetTag;
if (DataView && getTag$3(new DataView(new ArrayBuffer(1))) != dataViewTag$2 || Map && getTag$3(new Map()) != mapTag$3 || Promise$1 && getTag$3(Promise$1.resolve()) != promiseTag || Set && getTag$3(new Set()) != setTag$3 || WeakMap && getTag$3(new WeakMap()) != weakMapTag$1) {
  getTag$3 = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$3;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
var _getTag = getTag$3;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function initCloneArray$1(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var _initCloneArray = initCloneArray$1;
var root = _root;
var Uint8Array$1 = root.Uint8Array;
var _Uint8Array = Uint8Array$1;
var Uint8Array = _Uint8Array;
function cloneArrayBuffer$3(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}
var _cloneArrayBuffer = cloneArrayBuffer$3;
var cloneArrayBuffer$2 = _cloneArrayBuffer;
function cloneDataView$1(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$2(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var _cloneDataView = cloneDataView$1;
var reFlags = /\w*$/;
function cloneRegExp$1(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var _cloneRegExp = cloneRegExp$1;
var Symbol$1 = _Symbol;
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function cloneSymbol$1(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
var _cloneSymbol = cloneSymbol$1;
var cloneArrayBuffer$1 = _cloneArrayBuffer;
function cloneTypedArray$1(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$1(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var _cloneTypedArray = cloneTypedArray$1;
var cloneArrayBuffer = _cloneArrayBuffer, cloneDataView = _cloneDataView, cloneRegExp = _cloneRegExp, cloneSymbol = _cloneSymbol, cloneTypedArray = _cloneTypedArray;
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag$1(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);
    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);
    case dataViewTag$1:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);
    case mapTag$2:
      return new Ctor();
    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);
    case regexpTag$1:
      return cloneRegExp(object);
    case setTag$2:
      return new Ctor();
    case symbolTag$1:
      return cloneSymbol(object);
  }
}
var _initCloneByTag = initCloneByTag$1;
var isObject$1 = isObject_1;
var objectCreate = Object.create;
var baseCreate$1 = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject$1(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
var _baseCreate = baseCreate$1;
var baseCreate = _baseCreate, getPrototype = _getPrototype, isPrototype = _isPrototype;
function initCloneObject$1(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
var _initCloneObject = initCloneObject$1;
var getTag$2 = _getTag, isObjectLike$1 = isObjectLike_1;
var mapTag$1 = "[object Map]";
function baseIsMap$1(value) {
  return isObjectLike$1(value) && getTag$2(value) == mapTag$1;
}
var _baseIsMap = baseIsMap$1;
var baseIsMap = _baseIsMap, baseUnary$1 = _baseUnary, nodeUtil$1 = _nodeUtil.exports;
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap$1 = nodeIsMap ? baseUnary$1(nodeIsMap) : baseIsMap;
var isMap_1 = isMap$1;
var getTag$1 = _getTag, isObjectLike = isObjectLike_1;
var setTag$1 = "[object Set]";
function baseIsSet$1(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$1;
}
var _baseIsSet = baseIsSet$1;
var baseIsSet = _baseIsSet, baseUnary = _baseUnary, nodeUtil = _nodeUtil.exports;
var nodeIsSet = nodeUtil && nodeUtil.isSet;
var isSet$1 = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
var isSet_1 = isSet$1;
var Stack = _Stack, arrayEach = _arrayEach, assignValue = _assignValue, baseAssign = _baseAssign, baseAssignIn = _baseAssignIn, cloneBuffer = _cloneBuffer.exports, copyArray = _copyArray, copySymbols = _copySymbols, copySymbolsIn = _copySymbolsIn, getAllKeys = _getAllKeys, getAllKeysIn = _getAllKeysIn, getTag = _getTag, initCloneArray = _initCloneArray, initCloneByTag = _initCloneByTag, initCloneObject = _initCloneObject, isArray = isArray_1, isBuffer = isBuffer$2.exports, isMap = isMap_1, isObject = isObject_1, isSet = isSet_1, keys = keys_1, keysIn = keysIn_1;
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone$1(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone$1(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone$1(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone$1(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var _baseClone = baseClone$1;
var baseClone = _baseClone;
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
var cloneDeep_1 = cloneDeep;
var wangEditor = { exports: {} };
(function(module, exports) {
  (function webpackUniversalModuleDefinition(root2, factory) {
    module.exports = factory();
  })(window, function() {
    return function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
          return installedModules[moduleId].exports;
        }
        var module2 = installedModules[moduleId] = {
          i: moduleId,
          l: false,
          exports: {}
        };
        modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
        module2.l = true;
        return module2.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.d = function(exports2, name, getter) {
        if (!__webpack_require__.o(exports2, name)) {
          Object.defineProperty(exports2, name, { enumerable: true, get: getter });
        }
      };
      __webpack_require__.r = function(exports2) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
        }
        Object.defineProperty(exports2, "__esModule", { value: true });
      };
      __webpack_require__.t = function(value, mode) {
        if (mode & 1)
          value = __webpack_require__(value);
        if (mode & 8)
          return value;
        if (mode & 4 && typeof value === "object" && value && value.__esModule)
          return value;
        var ns = /* @__PURE__ */ Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", { enumerable: true, value });
        if (mode & 2 && typeof value != "string")
          for (var key in value)
            __webpack_require__.d(ns, key, function(key2) {
              return value[key2];
            }.bind(null, key));
        return ns;
      };
      __webpack_require__.n = function(module2) {
        var getter = module2 && module2.__esModule ? function getDefault() {
          return module2["default"];
        } : function getModuleExports() {
          return module2;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
      };
      __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      __webpack_require__.p = "";
      return __webpack_require__(__webpack_require__.s = 141);
    }([
      function(module2, exports2) {
        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : {
            "default": obj
          };
        }
        module2.exports = _interopRequireDefault;
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(142);
      },
      function(module2, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, "__extends", function() {
          return __extends;
        });
        __webpack_require__.d(__webpack_exports__, "__assign", function() {
          return __assign;
        });
        __webpack_require__.d(__webpack_exports__, "__rest", function() {
          return __rest;
        });
        __webpack_require__.d(__webpack_exports__, "__decorate", function() {
          return __decorate;
        });
        __webpack_require__.d(__webpack_exports__, "__param", function() {
          return __param;
        });
        __webpack_require__.d(__webpack_exports__, "__metadata", function() {
          return __metadata;
        });
        __webpack_require__.d(__webpack_exports__, "__awaiter", function() {
          return __awaiter;
        });
        __webpack_require__.d(__webpack_exports__, "__generator", function() {
          return __generator;
        });
        __webpack_require__.d(__webpack_exports__, "__createBinding", function() {
          return __createBinding;
        });
        __webpack_require__.d(__webpack_exports__, "__exportStar", function() {
          return __exportStar;
        });
        __webpack_require__.d(__webpack_exports__, "__values", function() {
          return __values;
        });
        __webpack_require__.d(__webpack_exports__, "__read", function() {
          return __read;
        });
        __webpack_require__.d(__webpack_exports__, "__spread", function() {
          return __spread;
        });
        __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() {
          return __spreadArrays;
        });
        __webpack_require__.d(__webpack_exports__, "__spreadArray", function() {
          return __spreadArray;
        });
        __webpack_require__.d(__webpack_exports__, "__await", function() {
          return __await;
        });
        __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() {
          return __asyncGenerator;
        });
        __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() {
          return __asyncDelegator;
        });
        __webpack_require__.d(__webpack_exports__, "__asyncValues", function() {
          return __asyncValues;
        });
        __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() {
          return __makeTemplateObject;
        });
        __webpack_require__.d(__webpack_exports__, "__importStar", function() {
          return __importStar;
        });
        __webpack_require__.d(__webpack_exports__, "__importDefault", function() {
          return __importDefault;
        });
        __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() {
          return __classPrivateFieldGet;
        });
        __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() {
          return __classPrivateFieldSet;
        });
        /*! *****************************************************************************
        Copyright (c) Microsoft Corporation.
        
        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.
        
        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        function __extends(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        }
        var __assign = function() {
          __assign = Object.assign || function __assign2(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
            }
            return t;
          };
          return __assign.apply(this, arguments);
        };
        function __rest(s, e) {
          var t = {};
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
              t[p] = s[p];
          if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
            }
          return t;
        }
        function __decorate(decorators, target, key, desc) {
          var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
          if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
          else
            for (var i = decorators.length - 1; i >= 0; i--)
              if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
          return c > 3 && r && Object.defineProperty(target, key, r), r;
        }
        function __param(paramIndex, decorator) {
          return function(target, key) {
            decorator(target, key, paramIndex);
          };
        }
        function __metadata(metadataKey, metadataValue) {
          if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
        }
        function __awaiter(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
              resolve(value);
            });
          }
          return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        }
        function __generator(thisArg, body) {
          var _ = { label: 0, sent: function() {
            if (t[0] & 1)
              throw t[1];
            return t[1];
          }, trys: [], ops: [] }, f, y, t, g;
          return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
          }), g;
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f)
              throw new TypeError("Generator is already executing.");
            while (_)
              try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                  return t;
                if (y = 0, t)
                  op = [op[0] & 2, t.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;
                  case 4:
                    _.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                      _.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2];
                      _.ops.push(op);
                      break;
                    }
                    if (t[2])
                      _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            if (op[0] & 5)
              throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        }
        var __createBinding = Object.create ? function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          Object.defineProperty(o, k2, { enumerable: true, get: function() {
            return m[k];
          } });
        } : function(o, m, k, k2) {
          if (k2 === void 0)
            k2 = k;
          o[k2] = m[k];
        };
        function __exportStar(m, o) {
          for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
              __createBinding(o, m, p);
        }
        function __values(o) {
          var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
          if (m)
            return m.call(o);
          if (o && typeof o.length === "number")
            return {
              next: function() {
                if (o && i >= o.length)
                  o = void 0;
                return { value: o && o[i++], done: !o };
              }
            };
          throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
        }
        function __read(o, n) {
          var m = typeof Symbol === "function" && o[Symbol.iterator];
          if (!m)
            return o;
          var i = m.call(o), r, ar = [], e;
          try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
              ar.push(r.value);
          } catch (error) {
            e = { error };
          } finally {
            try {
              if (r && !r.done && (m = i["return"]))
                m.call(i);
            } finally {
              if (e)
                throw e.error;
            }
          }
          return ar;
        }
        function __spread() {
          for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
          return ar;
        }
        function __spreadArrays() {
          for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
          for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
          return r;
        }
        function __spreadArray(to, from) {
          for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
          return to;
        }
        function __await(v) {
          return this instanceof __await ? (this.v = v, this) : new __await(v);
        }
        function __asyncGenerator(thisArg, _arguments, generator) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var g = generator.apply(thisArg, _arguments || []), i, q = [];
          return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i;
          function verb(n) {
            if (g[n])
              i[n] = function(v) {
                return new Promise(function(a, b) {
                  q.push([n, v, a, b]) > 1 || resume(n, v);
                });
              };
          }
          function resume(n, v) {
            try {
              step(g[n](v));
            } catch (e) {
              settle(q[0][3], e);
            }
          }
          function step(r) {
            r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
          }
          function fulfill(value) {
            resume("next", value);
          }
          function reject(value) {
            resume("throw", value);
          }
          function settle(f, v) {
            if (f(v), q.shift(), q.length)
              resume(q[0][0], q[0][1]);
          }
        }
        function __asyncDelegator(o) {
          var i, p;
          return i = {}, verb("next"), verb("throw", function(e) {
            throw e;
          }), verb("return"), i[Symbol.iterator] = function() {
            return this;
          }, i;
          function verb(n, f) {
            i[n] = o[n] ? function(v) {
              return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v;
            } : f;
          }
        }
        function __asyncValues(o) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var m = o[Symbol.asyncIterator], i;
          return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
            return this;
          }, i);
          function verb(n) {
            i[n] = o[n] && function(v) {
              return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
              });
            };
          }
          function settle(resolve, reject, d, v) {
            Promise.resolve(v).then(function(v2) {
              resolve({ value: v2, done: d });
            }, reject);
          }
        }
        function __makeTemplateObject(cooked, raw) {
          if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
          } else {
            cooked.raw = raw;
          }
          return cooked;
        }
        var __setModuleDefault = Object.create ? function(o, v) {
          Object.defineProperty(o, "default", { enumerable: true, value: v });
        } : function(o, v) {
          o["default"] = v;
        };
        function __importStar(mod) {
          if (mod && mod.__esModule)
            return mod;
          var result = {};
          if (mod != null) {
            for (var k in mod)
              if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
          }
          __setModuleDefault(result, mod);
          return result;
        }
        function __importDefault(mod) {
          return mod && mod.__esModule ? mod : { default: mod };
        }
        function __classPrivateFieldGet(receiver, privateMap) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
          }
          return privateMap.get(receiver);
        }
        function __classPrivateFieldSet(receiver, privateMap, value) {
          if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
          }
          privateMap.set(receiver, value);
          return value;
        }
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _isArray = _interopRequireDefault(__webpack_require__(89));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _map = _interopRequireDefault(__webpack_require__(26));
        var _trim = _interopRequireDefault(__webpack_require__(17));
        var _map2 = _interopRequireDefault(__webpack_require__(121));
        var _indexOf = _interopRequireDefault(__webpack_require__(27));
        var _splice = _interopRequireDefault(__webpack_require__(91));
        var _filter = _interopRequireDefault(__webpack_require__(70));
        var _includes = _interopRequireDefault(__webpack_require__(28));
        var _bind = _interopRequireDefault(__webpack_require__(57));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.DomElement = void 0;
        var tslib_1 = __webpack_require__(2);
        var util_1 = __webpack_require__(6);
        var AGENT_EVENTS = [];
        function _createElemByHTML(html) {
          var div = document.createElement("div");
          div.innerHTML = html;
          var elems = div.children;
          return util_1.toArray(elems);
        }
        function _isDOMList(selector) {
          if (!selector) {
            return false;
          }
          if (selector instanceof HTMLCollection || selector instanceof NodeList) {
            return true;
          }
          return false;
        }
        function _querySelectorAll(selector) {
          var elems = document.querySelectorAll(selector);
          return util_1.toArray(elems);
        }
        function _styleArrTrim(style) {
          var styleArr = [];
          var resultArr = [];
          if (!(0, _isArray["default"])(style)) {
            styleArr = style.split(";");
          } else {
            styleArr = style;
          }
          (0, _forEach["default"])(styleArr).call(styleArr, function(item) {
            var _context;
            var arr = (0, _map["default"])(_context = item.split(":")).call(_context, function(i) {
              return (0, _trim["default"])(i).call(i);
            });
            if (arr.length === 2) {
              resultArr.push(arr[0] + ":" + arr[1]);
            }
          });
          return resultArr;
        }
        var DomElement = function() {
          function DomElement2(selector) {
            this.elems = [];
            this.length = this.elems.length;
            this.dataSource = new _map2["default"]();
            if (!selector) {
              return;
            }
            if (selector instanceof DomElement2) {
              return selector;
            }
            var selectorResult = [];
            var nodeType = selector instanceof Node ? selector.nodeType : -1;
            this.selector = selector;
            if (nodeType === 1 || nodeType === 9) {
              selectorResult = [selector];
            } else if (_isDOMList(selector)) {
              selectorResult = util_1.toArray(selector);
            } else if (selector instanceof Array) {
              selectorResult = selector;
            } else if (typeof selector === "string") {
              var _context2;
              var tmpSelector = (0, _trim["default"])(_context2 = selector.replace("/\n/mg", "")).call(_context2);
              if ((0, _indexOf["default"])(tmpSelector).call(tmpSelector, "<") === 0) {
                selectorResult = _createElemByHTML(tmpSelector);
              } else {
                selectorResult = _querySelectorAll(tmpSelector);
              }
            }
            var length = selectorResult.length;
            if (!length) {
              return this;
            }
            var i = 0;
            for (; i < length; i++) {
              this.elems.push(selectorResult[i]);
            }
            this.length = length;
          }
          (0, _defineProperty2["default"])(DomElement2.prototype, "id", {
            get: function get() {
              return this.elems[0].id;
            },
            enumerable: false,
            configurable: true
          });
          DomElement2.prototype.forEach = function(fn) {
            for (var i = 0; i < this.length; i++) {
              var elem = this.elems[i];
              var result = fn.call(elem, elem, i);
              if (result === false) {
                break;
              }
            }
            return this;
          };
          DomElement2.prototype.clone = function(deep) {
            var _context3;
            if (deep === void 0) {
              deep = false;
            }
            var cloneList = [];
            (0, _forEach["default"])(_context3 = this.elems).call(_context3, function(elem) {
              cloneList.push(elem.cloneNode(!!deep));
            });
            return $(cloneList);
          };
          DomElement2.prototype.get = function(index2) {
            if (index2 === void 0) {
              index2 = 0;
            }
            var length = this.length;
            if (index2 >= length) {
              index2 = index2 % length;
            }
            return $(this.elems[index2]);
          };
          DomElement2.prototype.first = function() {
            return this.get(0);
          };
          DomElement2.prototype.last = function() {
            var length = this.length;
            return this.get(length - 1);
          };
          DomElement2.prototype.on = function(type, selector, fn) {
            var _context4;
            if (!type)
              return this;
            if (typeof selector === "function") {
              fn = selector;
              selector = "";
            }
            return (0, _forEach["default"])(_context4 = this).call(_context4, function(elem) {
              if (!selector) {
                elem.addEventListener(type, fn);
                return;
              }
              var agentFn = function agentFn2(e) {
                var target = e.target;
                if (target.matches(selector)) {
                  fn.call(target, e);
                }
              };
              elem.addEventListener(type, agentFn);
              AGENT_EVENTS.push({
                elem,
                selector,
                fn,
                agentFn
              });
            });
          };
          DomElement2.prototype.off = function(type, selector, fn) {
            var _context5;
            if (!type)
              return this;
            if (typeof selector === "function") {
              fn = selector;
              selector = "";
            }
            return (0, _forEach["default"])(_context5 = this).call(_context5, function(elem) {
              if (selector) {
                var idx = -1;
                for (var i = 0; i < AGENT_EVENTS.length; i++) {
                  var item = AGENT_EVENTS[i];
                  if (item.selector === selector && item.fn === fn && item.elem === elem) {
                    idx = i;
                    break;
                  }
                }
                if (idx !== -1) {
                  var agentFn = (0, _splice["default"])(AGENT_EVENTS).call(AGENT_EVENTS, idx, 1)[0].agentFn;
                  elem.removeEventListener(type, agentFn);
                }
              } else {
                elem.removeEventListener(type, fn);
              }
            });
          };
          DomElement2.prototype.attr = function(key, val) {
            var _context6;
            if (val == null) {
              return this.elems[0].getAttribute(key) || "";
            }
            return (0, _forEach["default"])(_context6 = this).call(_context6, function(elem) {
              elem.setAttribute(key, val);
            });
          };
          DomElement2.prototype.removeAttr = function(key) {
            var _context7;
            (0, _forEach["default"])(_context7 = this).call(_context7, function(elem) {
              elem.removeAttribute(key);
            });
          };
          DomElement2.prototype.addClass = function(className) {
            var _context8;
            if (!className) {
              return this;
            }
            return (0, _forEach["default"])(_context8 = this).call(_context8, function(elem) {
              if (elem.className) {
                var arr = elem.className.split(/\s/);
                arr = (0, _filter["default"])(arr).call(arr, function(item) {
                  return !!(0, _trim["default"])(item).call(item);
                });
                if ((0, _indexOf["default"])(arr).call(arr, className) < 0) {
                  arr.push(className);
                }
                elem.className = arr.join(" ");
              } else {
                elem.className = className;
              }
            });
          };
          DomElement2.prototype.removeClass = function(className) {
            var _context9;
            if (!className) {
              return this;
            }
            return (0, _forEach["default"])(_context9 = this).call(_context9, function(elem) {
              if (!elem.className) {
                return;
              }
              var arr = elem.className.split(/\s/);
              arr = (0, _filter["default"])(arr).call(arr, function(item) {
                item = (0, _trim["default"])(item).call(item);
                if (!item || item === className) {
                  return false;
                }
                return true;
              });
              elem.className = arr.join(" ");
            });
          };
          DomElement2.prototype.hasClass = function(className) {
            if (!className) {
              return false;
            }
            var elem = this.elems[0];
            if (!elem.className) {
              return false;
            }
            var arr = elem.className.split(/\s/);
            return (0, _includes["default"])(arr).call(arr, className);
          };
          DomElement2.prototype.css = function(key, val) {
            var _context10;
            var currentStyle;
            if (val == "") {
              currentStyle = "";
            } else {
              currentStyle = key + ":" + val + ";";
            }
            return (0, _forEach["default"])(_context10 = this).call(_context10, function(elem) {
              var _context11;
              var style = (0, _trim["default"])(_context11 = elem.getAttribute("style") || "").call(_context11);
              if (style) {
                var resultArr = _styleArrTrim(style);
                resultArr = (0, _map["default"])(resultArr).call(resultArr, function(item) {
                  if ((0, _indexOf["default"])(item).call(item, key) === 0) {
                    return currentStyle;
                  } else {
                    return item;
                  }
                });
                if (currentStyle != "" && (0, _indexOf["default"])(resultArr).call(resultArr, currentStyle) < 0) {
                  resultArr.push(currentStyle);
                }
                if (currentStyle == "") {
                  resultArr = _styleArrTrim(resultArr);
                }
                elem.setAttribute("style", resultArr.join("; "));
              } else {
                elem.setAttribute("style", currentStyle);
              }
            });
          };
          DomElement2.prototype.getBoundingClientRect = function() {
            var elem = this.elems[0];
            return elem.getBoundingClientRect();
          };
          DomElement2.prototype.show = function() {
            return this.css("display", "block");
          };
          DomElement2.prototype.hide = function() {
            return this.css("display", "none");
          };
          DomElement2.prototype.children = function() {
            var elem = this.elems[0];
            if (!elem) {
              return null;
            }
            return $(elem.children);
          };
          DomElement2.prototype.childNodes = function() {
            var elem = this.elems[0];
            if (!elem) {
              return null;
            }
            return $(elem.childNodes);
          };
          DomElement2.prototype.replaceChildAll = function($children) {
            var parent = this.getNode();
            var elem = this.elems[0];
            while (elem.hasChildNodes()) {
              parent.firstChild && elem.removeChild(parent.firstChild);
            }
            this.append($children);
          };
          DomElement2.prototype.append = function($children) {
            var _context12;
            return (0, _forEach["default"])(_context12 = this).call(_context12, function(elem) {
              (0, _forEach["default"])($children).call($children, function(child) {
                elem.appendChild(child);
              });
            });
          };
          DomElement2.prototype.remove = function() {
            var _context13;
            return (0, _forEach["default"])(_context13 = this).call(_context13, function(elem) {
              if (elem.remove) {
                elem.remove();
              } else {
                var parent_1 = elem.parentElement;
                parent_1 && parent_1.removeChild(elem);
              }
            });
          };
          DomElement2.prototype.isContain = function($child) {
            var elem = this.elems[0];
            var child = $child.elems[0];
            return elem.contains(child);
          };
          DomElement2.prototype.getNodeName = function() {
            var elem = this.elems[0];
            return elem.nodeName;
          };
          DomElement2.prototype.getNode = function(n) {
            if (n === void 0) {
              n = 0;
            }
            var elem;
            elem = this.elems[n];
            return elem;
          };
          DomElement2.prototype.find = function(selector) {
            var elem = this.elems[0];
            return $(elem.querySelectorAll(selector));
          };
          DomElement2.prototype.text = function(val) {
            if (!val) {
              var elem = this.elems[0];
              return elem.innerHTML.replace(/<[^>]+>/g, function() {
                return "";
              });
            } else {
              var _context14;
              return (0, _forEach["default"])(_context14 = this).call(_context14, function(elem2) {
                elem2.innerHTML = val;
              });
            }
          };
          DomElement2.prototype.html = function(val) {
            var elem = this.elems[0];
            if (!val) {
              return elem.innerHTML;
            } else {
              elem.innerHTML = val;
              return this;
            }
          };
          DomElement2.prototype.val = function() {
            var _context15;
            var elem = this.elems[0];
            return (0, _trim["default"])(_context15 = elem.value).call(_context15);
          };
          DomElement2.prototype.focus = function() {
            var _context16;
            return (0, _forEach["default"])(_context16 = this).call(_context16, function(elem) {
              elem.focus();
            });
          };
          DomElement2.prototype.prev = function() {
            var elem = this.elems[0];
            return $(elem.previousElementSibling);
          };
          DomElement2.prototype.next = function() {
            var elem = this.elems[0];
            return $(elem.nextElementSibling);
          };
          DomElement2.prototype.getNextSibling = function() {
            var elem = this.elems[0];
            return $(elem.nextSibling);
          };
          DomElement2.prototype.parent = function() {
            var elem = this.elems[0];
            return $(elem.parentElement);
          };
          DomElement2.prototype.parentUntil = function(selector, curElem) {
            var elem = curElem || this.elems[0];
            if (elem.nodeName === "BODY") {
              return null;
            }
            var parent = elem.parentElement;
            if (parent === null) {
              return null;
            }
            if (parent.matches(selector)) {
              return $(parent);
            }
            return this.parentUntil(selector, parent);
          };
          DomElement2.prototype.parentUntilEditor = function(selector, editor, curElem) {
            var elem = curElem || this.elems[0];
            if ($(elem).equal(editor.$textContainerElem) || $(elem).equal(editor.$toolbarElem)) {
              return null;
            }
            var parent = elem.parentElement;
            if (parent === null) {
              return null;
            }
            if (parent.matches(selector)) {
              return $(parent);
            }
            return this.parentUntilEditor(selector, editor, parent);
          };
          DomElement2.prototype.equal = function($elem) {
            if ($elem instanceof DomElement2) {
              return this.elems[0] === $elem.elems[0];
            } else if ($elem instanceof HTMLElement) {
              return this.elems[0] === $elem;
            } else {
              return false;
            }
          };
          DomElement2.prototype.insertBefore = function(selector) {
            var _context17;
            var $referenceNode = $(selector);
            var referenceNode = $referenceNode.elems[0];
            if (!referenceNode) {
              return this;
            }
            return (0, _forEach["default"])(_context17 = this).call(_context17, function(elem) {
              var parent = referenceNode.parentNode;
              parent === null || parent === void 0 ? void 0 : parent.insertBefore(elem, referenceNode);
            });
          };
          DomElement2.prototype.insertAfter = function(selector) {
            var _context18;
            var $referenceNode = $(selector);
            var referenceNode = $referenceNode.elems[0];
            var anchorNode = referenceNode && referenceNode.nextSibling;
            if (!referenceNode) {
              return this;
            }
            return (0, _forEach["default"])(_context18 = this).call(_context18, function(elem) {
              var parent = referenceNode.parentNode;
              if (anchorNode) {
                parent.insertBefore(elem, anchorNode);
              } else {
                parent.appendChild(elem);
              }
            });
          };
          DomElement2.prototype.data = function(key, value) {
            if (value != null) {
              this.dataSource.set(key, value);
            } else {
              return this.dataSource.get(key);
            }
          };
          DomElement2.prototype.getNodeTop = function(editor) {
            if (this.length < 1) {
              return this;
            }
            var $parent = this.parent();
            if (editor.$textElem.equal(this) || editor.$textElem.equal($parent)) {
              return this;
            }
            $parent.prior = this;
            return $parent.getNodeTop(editor);
          };
          DomElement2.prototype.getOffsetData = function() {
            var $node = this.elems[0];
            return {
              top: $node.offsetTop,
              left: $node.offsetLeft,
              width: $node.offsetWidth,
              height: $node.offsetHeight,
              parent: $node.offsetParent
            };
          };
          DomElement2.prototype.scrollTop = function(top) {
            var $node = this.elems[0];
            $node.scrollTo({
              top
            });
          };
          return DomElement2;
        }();
        exports2.DomElement = DomElement;
        function $() {
          var arg = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i] = arguments[_i];
          }
          return new ((0, _bind["default"])(DomElement).apply(DomElement, tslib_1.__spreadArrays([void 0], arg)))();
        }
        exports2["default"] = $;
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(180);
      },
      function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__(8);
        var getOwnPropertyDescriptor = __webpack_require__(71).f;
        var isForced = __webpack_require__(101);
        var path = __webpack_require__(9);
        var bind = __webpack_require__(40);
        var createNonEnumerableProperty = __webpack_require__(19);
        var has = __webpack_require__(16);
        var wrapConstructor = function(NativeConstructor) {
          var Wrapper = function(a, b, c) {
            if (this instanceof NativeConstructor) {
              switch (arguments.length) {
                case 0:
                  return new NativeConstructor();
                case 1:
                  return new NativeConstructor(a);
                case 2:
                  return new NativeConstructor(a, b);
              }
              return new NativeConstructor(a, b, c);
            }
            return NativeConstructor.apply(this, arguments);
          };
          Wrapper.prototype = NativeConstructor.prototype;
          return Wrapper;
        };
        module2.exports = function(options, source) {
          var TARGET = options.target;
          var GLOBAL = options.global;
          var STATIC = options.stat;
          var PROTO = options.proto;
          var nativeSource = GLOBAL ? global2 : STATIC ? global2[TARGET] : (global2[TARGET] || {}).prototype;
          var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
          var targetPrototype = target.prototype;
          var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
          var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;
          for (key in source) {
            FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
            USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);
            targetProperty = target[key];
            if (USE_NATIVE)
              if (options.noTargetGet) {
                descriptor = getOwnPropertyDescriptor(nativeSource, key);
                nativeProperty = descriptor && descriptor.value;
              } else
                nativeProperty = nativeSource[key];
            sourceProperty = USE_NATIVE && nativeProperty ? nativeProperty : source[key];
            if (USE_NATIVE && typeof targetProperty === typeof sourceProperty)
              continue;
            if (options.bind && USE_NATIVE)
              resultProperty = bind(sourceProperty, global2);
            else if (options.wrap && USE_NATIVE)
              resultProperty = wrapConstructor(sourceProperty);
            else if (PROTO && typeof sourceProperty == "function")
              resultProperty = bind(Function.call, sourceProperty);
            else
              resultProperty = sourceProperty;
            if (options.sham || sourceProperty && sourceProperty.sham || targetProperty && targetProperty.sham) {
              createNonEnumerableProperty(resultProperty, "sham", true);
            }
            target[key] = resultProperty;
            if (PROTO) {
              VIRTUAL_PROTOTYPE = TARGET + "Prototype";
              if (!has(path, VIRTUAL_PROTOTYPE)) {
                createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
              }
              path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
              if (options.real && targetPrototype && !targetPrototype[key]) {
                createNonEnumerableProperty(targetPrototype, key, sourceProperty);
              }
            }
          }
        };
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _typeof2 = _interopRequireDefault(__webpack_require__(92));
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _parseInt2 = _interopRequireDefault(__webpack_require__(256));
        var _slice = _interopRequireDefault(__webpack_require__(45));
        var _setTimeout2 = _interopRequireDefault(__webpack_require__(46));
        var _isArray = _interopRequireDefault(__webpack_require__(89));
        var _map = _interopRequireDefault(__webpack_require__(26));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.hexToRgb = exports2.getRandomCode = exports2.toArray = exports2.deepClone = exports2.isFunction = exports2.debounce = exports2.throttle = exports2.arrForEach = exports2.forEach = exports2.replaceSpecialSymbol = exports2.replaceHtmlSymbol = exports2.getRandom = exports2.UA = void 0;
        var tslib_1 = __webpack_require__(2);
        var NavUA = function() {
          function NavUA2() {
            this._ua = navigator.userAgent;
            var math = this._ua.match(/(Edge?)\/(\d+)/);
            this.isOldEdge = math && math[1] == "Edge" && (0, _parseInt2["default"])(math[2]) < 19 ? true : false;
            this.isFirefox = /Firefox\/\d+/.test(this._ua) && !/Seamonkey\/\d+/.test(this._ua) ? true : false;
          }
          NavUA2.prototype.isIE = function() {
            return "ActiveXObject" in window;
          };
          NavUA2.prototype.isWebkit = function() {
            return /webkit/i.test(this._ua);
          };
          return NavUA2;
        }();
        exports2.UA = new NavUA();
        function getRandom(prefix) {
          var _context;
          if (prefix === void 0) {
            prefix = "";
          }
          return prefix + (0, _slice["default"])(_context = Math.random().toString()).call(_context, 2);
        }
        exports2.getRandom = getRandom;
        function replaceHtmlSymbol(html) {
          return html.replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/"/gm, "&quot;").replace(/(\r\n|\r|\n)/g, "<br/>");
        }
        exports2.replaceHtmlSymbol = replaceHtmlSymbol;
        function replaceSpecialSymbol(value) {
          return value.replace(/&lt;/gm, "<").replace(/&gt;/gm, ">").replace(/&quot;/gm, '"');
        }
        exports2.replaceSpecialSymbol = replaceSpecialSymbol;
        function forEach(obj, fn) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              var result = fn(key, obj[key]);
              if (result === false) {
                break;
              }
            }
          }
        }
        exports2.forEach = forEach;
        function arrForEach(fakeArr, fn) {
          var i, item, result;
          var length = fakeArr.length || 0;
          for (i = 0; i < length; i++) {
            item = fakeArr[i];
            result = fn.call(fakeArr, item, i);
            if (result === false) {
              break;
            }
          }
        }
        exports2.arrForEach = arrForEach;
        function throttle(fn, interval) {
          if (interval === void 0) {
            interval = 200;
          }
          var flag = false;
          return function() {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            if (!flag) {
              flag = true;
              (0, _setTimeout2["default"])(function() {
                flag = false;
                fn.call.apply(fn, tslib_1.__spreadArrays([_this], args));
              }, interval);
            }
          };
        }
        exports2.throttle = throttle;
        function debounce(fn, delay) {
          if (delay === void 0) {
            delay = 200;
          }
          var lastFn = 0;
          return function() {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            if (lastFn) {
              window.clearTimeout(lastFn);
            }
            lastFn = (0, _setTimeout2["default"])(function() {
              lastFn = 0;
              fn.call.apply(fn, tslib_1.__spreadArrays([_this], args));
            }, delay);
          };
        }
        exports2.debounce = debounce;
        function isFunction2(fn) {
          return typeof fn === "function";
        }
        exports2.isFunction = isFunction2;
        function deepClone(data) {
          if ((0, _typeof2["default"])(data) !== "object" || typeof data == "function" || data === null) {
            return data;
          }
          var item;
          if ((0, _isArray["default"])(data)) {
            item = [];
          }
          if (!(0, _isArray["default"])(data)) {
            item = {};
          }
          for (var i in data) {
            if (Object.prototype.hasOwnProperty.call(data, i)) {
              item[i] = deepClone(data[i]);
            }
          }
          return item;
        }
        exports2.deepClone = deepClone;
        function toArray(data) {
          return (0, _slice["default"])(Array.prototype).call(data);
        }
        exports2.toArray = toArray;
        function getRandomCode() {
          var _context2;
          return (0, _slice["default"])(_context2 = Math.random().toString(36)).call(_context2, -5);
        }
        exports2.getRandomCode = getRandomCode;
        function hexToRgb(hex) {
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          if (result == null)
            return null;
          var colors = (0, _map["default"])(result).call(result, function(i) {
            return (0, _parseInt2["default"])(i, 16);
          });
          var r = colors[1];
          var g = colors[2];
          var b = colors[3];
          return "rgb(" + r + ", " + g + ", " + b + ")";
        }
        exports2.hexToRgb = hexToRgb;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.EMPTY_P_REGEX = exports2.EMPTY_P_LAST_REGEX = exports2.EMPTY_P = exports2.urlRegex = exports2.EMPTY_FN = void 0;
        function EMPTY_FN() {
        }
        exports2.EMPTY_FN = EMPTY_FN;
        exports2.urlRegex = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&amp;:/~+#]*[\w\-@?^=%&amp;/~+#])?/g;
        exports2.EMPTY_P = '<p data-we-empty-p=""><br></p>';
        exports2.EMPTY_P_LAST_REGEX = /<p data-we-empty-p=""><br\/?><\/p>$/gim;
        exports2.EMPTY_P_REGEX = /<p data-we-empty-p="">/gim;
      },
      function(module2, exports2, __webpack_require__) {
        (function(global2) {
          var check = function(it) {
            return it && it.Math == Math && it;
          };
          module2.exports = check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof global2 == "object" && global2) || Function("return this")();
        }).call(this, __webpack_require__(145));
      },
      function(module2, exports2) {
        module2.exports = {};
      },
      function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__(8);
        var shared = __webpack_require__(74);
        var has = __webpack_require__(16);
        var uid = __webpack_require__(64);
        var NATIVE_SYMBOL = __webpack_require__(76);
        var USE_SYMBOL_AS_UID = __webpack_require__(106);
        var WellKnownSymbolsStore = shared("wks");
        var Symbol2 = global2.Symbol;
        var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2 : Symbol2 && Symbol2.withoutSetter || uid;
        module2.exports = function(name) {
          if (!has(WellKnownSymbolsStore, name)) {
            if (NATIVE_SYMBOL && has(Symbol2, name))
              WellKnownSymbolsStore[name] = Symbol2[name];
            else
              WellKnownSymbolsStore[name] = createWellKnownSymbol("Symbol." + name);
          }
          return WellKnownSymbolsStore[name];
        };
      },
      function(module2, exports2) {
        module2.exports = function(exec) {
          try {
            return !!exec();
          } catch (error) {
            return true;
          }
        };
      },
      function(module2, exports2, __webpack_require__) {
        var path = __webpack_require__(9);
        var has = __webpack_require__(16);
        var wrappedWellKnownSymbolModule = __webpack_require__(93);
        var defineProperty2 = __webpack_require__(18).f;
        module2.exports = function(NAME) {
          var Symbol2 = path.Symbol || (path.Symbol = {});
          if (!has(Symbol2, NAME))
            defineProperty2(Symbol2, NAME, {
              value: wrappedWellKnownSymbolModule.f(NAME)
            });
        };
      },
      function(module2, exports2) {
        module2.exports = function(it) {
          return typeof it === "object" ? it !== null : typeof it === "function";
        };
      },
      function(module2, exports2, __webpack_require__) {
        var fails = __webpack_require__(11);
        module2.exports = !fails(function() {
          return Object.defineProperty({}, 1, { get: function() {
            return 7;
          } })[1] != 7;
        });
      },
      function(module2, exports2, __webpack_require__) {
        var path = __webpack_require__(9);
        module2.exports = function(CONSTRUCTOR) {
          return path[CONSTRUCTOR + "Prototype"];
        };
      },
      function(module2, exports2) {
        var hasOwnProperty2 = {}.hasOwnProperty;
        module2.exports = function(it, key) {
          return hasOwnProperty2.call(it, key);
        };
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(192);
      },
      function(module2, exports2, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__(14);
        var IE8_DOM_DEFINE = __webpack_require__(100);
        var anObject = __webpack_require__(25);
        var toPrimitive = __webpack_require__(60);
        var nativeDefineProperty = Object.defineProperty;
        exports2.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty2(O, P, Attributes) {
          anObject(O);
          P = toPrimitive(P, true);
          anObject(Attributes);
          if (IE8_DOM_DEFINE)
            try {
              return nativeDefineProperty(O, P, Attributes);
            } catch (error) {
            }
          if ("get" in Attributes || "set" in Attributes)
            throw TypeError("Accessors not supported");
          if ("value" in Attributes)
            O[P] = Attributes.value;
          return O;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__(14);
        var definePropertyModule = __webpack_require__(18);
        var createPropertyDescriptor = __webpack_require__(48);
        module2.exports = DESCRIPTORS ? function(object, key, value) {
          return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
        } : function(object, key, value) {
          object[key] = value;
          return object;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var isOldIE = function isOldIE2() {
          var memo;
          return function memorize() {
            if (typeof memo === "undefined") {
              memo = Boolean(window && document && document.all && !window.atob);
            }
            return memo;
          };
        }();
        var getTarget = function getTarget2() {
          var memo = {};
          return function memorize(target) {
            if (typeof memo[target] === "undefined") {
              var styleTarget = document.querySelector(target);
              if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
                try {
                  styleTarget = styleTarget.contentDocument.head;
                } catch (e) {
                  styleTarget = null;
                }
              }
              memo[target] = styleTarget;
            }
            return memo[target];
          };
        }();
        var stylesInDom = [];
        function getIndexByIdentifier(identifier) {
          var result = -1;
          for (var i = 0; i < stylesInDom.length; i++) {
            if (stylesInDom[i].identifier === identifier) {
              result = i;
              break;
            }
          }
          return result;
        }
        function modulesToDom(list, options) {
          var idCountMap = {};
          var identifiers = [];
          for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var id = options.base ? item[0] + options.base : item[0];
            var count = idCountMap[id] || 0;
            var identifier = "".concat(id, " ").concat(count);
            idCountMap[id] = count + 1;
            var index2 = getIndexByIdentifier(identifier);
            var obj = {
              css: item[1],
              media: item[2],
              sourceMap: item[3]
            };
            if (index2 !== -1) {
              stylesInDom[index2].references++;
              stylesInDom[index2].updater(obj);
            } else {
              stylesInDom.push({
                identifier,
                updater: addStyle(obj, options),
                references: 1
              });
            }
            identifiers.push(identifier);
          }
          return identifiers;
        }
        function insertStyleElement(options) {
          var style = document.createElement("style");
          var attributes = options.attributes || {};
          if (typeof attributes.nonce === "undefined") {
            var nonce = __webpack_require__.nc;
            if (nonce) {
              attributes.nonce = nonce;
            }
          }
          Object.keys(attributes).forEach(function(key) {
            style.setAttribute(key, attributes[key]);
          });
          if (typeof options.insert === "function") {
            options.insert(style);
          } else {
            var target = getTarget(options.insert || "head");
            if (!target) {
              throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            }
            target.appendChild(style);
          }
          return style;
        }
        function removeStyleElement(style) {
          if (style.parentNode === null) {
            return false;
          }
          style.parentNode.removeChild(style);
        }
        var replaceText = function replaceText2() {
          var textStore = [];
          return function replace(index2, replacement) {
            textStore[index2] = replacement;
            return textStore.filter(Boolean).join("\n");
          };
        }();
        function applyToSingletonTag(style, index2, remove, obj) {
          var css = remove ? "" : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css;
          if (style.styleSheet) {
            style.styleSheet.cssText = replaceText(index2, css);
          } else {
            var cssNode = document.createTextNode(css);
            var childNodes = style.childNodes;
            if (childNodes[index2]) {
              style.removeChild(childNodes[index2]);
            }
            if (childNodes.length) {
              style.insertBefore(cssNode, childNodes[index2]);
            } else {
              style.appendChild(cssNode);
            }
          }
        }
        function applyToTag(style, options, obj) {
          var css = obj.css;
          var media = obj.media;
          var sourceMap = obj.sourceMap;
          if (media) {
            style.setAttribute("media", media);
          } else {
            style.removeAttribute("media");
          }
          if (sourceMap && typeof btoa !== "undefined") {
            css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
          }
          if (style.styleSheet) {
            style.styleSheet.cssText = css;
          } else {
            while (style.firstChild) {
              style.removeChild(style.firstChild);
            }
            style.appendChild(document.createTextNode(css));
          }
        }
        var singleton = null;
        var singletonCounter = 0;
        function addStyle(obj, options) {
          var style;
          var update;
          var remove;
          if (options.singleton) {
            var styleIndex = singletonCounter++;
            style = singleton || (singleton = insertStyleElement(options));
            update = applyToSingletonTag.bind(null, style, styleIndex, false);
            remove = applyToSingletonTag.bind(null, style, styleIndex, true);
          } else {
            style = insertStyleElement(options);
            update = applyToTag.bind(null, style, options);
            remove = function remove2() {
              removeStyleElement(style);
            };
          }
          update(obj);
          return function updateStyle(newObj) {
            if (newObj) {
              if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
                return;
              }
              update(obj = newObj);
            } else {
              remove();
            }
          };
        }
        module2.exports = function(list, options) {
          options = options || {};
          if (!options.singleton && typeof options.singleton !== "boolean") {
            options.singleton = isOldIE();
          }
          list = list || [];
          var lastIdentifiers = modulesToDom(list, options);
          return function update(newList) {
            newList = newList || [];
            if (Object.prototype.toString.call(newList) !== "[object Array]") {
              return;
            }
            for (var i = 0; i < lastIdentifiers.length; i++) {
              var identifier = lastIdentifiers[i];
              var index2 = getIndexByIdentifier(identifier);
              stylesInDom[index2].references--;
            }
            var newLastIdentifiers = modulesToDom(newList, options);
            for (var _i = 0; _i < lastIdentifiers.length; _i++) {
              var _identifier = lastIdentifiers[_i];
              var _index = getIndexByIdentifier(_identifier);
              if (stylesInDom[_index].references === 0) {
                stylesInDom[_index].updater();
                stylesInDom.splice(_index, 1);
              }
            }
            lastIdentifiers = newLastIdentifiers;
          };
        };
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = function(useSourceMap) {
          var list = [];
          list.toString = function toString() {
            return this.map(function(item) {
              var content = cssWithMappingToString(item, useSourceMap);
              if (item[2]) {
                return "@media ".concat(item[2], " {").concat(content, "}");
              }
              return content;
            }).join("");
          };
          list.i = function(modules, mediaQuery, dedupe) {
            if (typeof modules === "string") {
              modules = [[null, modules, ""]];
            }
            var alreadyImportedModules = {};
            if (dedupe) {
              for (var i = 0; i < this.length; i++) {
                var id = this[i][0];
                if (id != null) {
                  alreadyImportedModules[id] = true;
                }
              }
            }
            for (var _i = 0; _i < modules.length; _i++) {
              var item = [].concat(modules[_i]);
              if (dedupe && alreadyImportedModules[item[0]]) {
                continue;
              }
              if (mediaQuery) {
                if (!item[2]) {
                  item[2] = mediaQuery;
                } else {
                  item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
                }
              }
              list.push(item);
            }
          };
          return list;
        };
        function cssWithMappingToString(item, useSourceMap) {
          var content = item[1] || "";
          var cssMapping = item[3];
          if (!cssMapping) {
            return content;
          }
          if (useSourceMap && typeof btoa === "function") {
            var sourceMapping = toComment(cssMapping);
            var sourceURLs = cssMapping.sources.map(function(source) {
              return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
            });
            return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
          }
          return [content].join("\n");
        }
        function toComment(sourceMap) {
          var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
          var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
          return "/*# ".concat(data, " */");
        }
      },
      function(module2, exports2, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__(14);
        var fails = __webpack_require__(11);
        var has = __webpack_require__(16);
        var defineProperty2 = Object.defineProperty;
        var cache = {};
        var thrower = function(it) {
          throw it;
        };
        module2.exports = function(METHOD_NAME, options) {
          if (has(cache, METHOD_NAME))
            return cache[METHOD_NAME];
          if (!options)
            options = {};
          var method = [][METHOD_NAME];
          var ACCESSORS = has(options, "ACCESSORS") ? options.ACCESSORS : false;
          var argument0 = has(options, 0) ? options[0] : thrower;
          var argument1 = has(options, 1) ? options[1] : void 0;
          return cache[METHOD_NAME] = !!method && !fails(function() {
            if (ACCESSORS && !DESCRIPTORS)
              return true;
            var O = { length: -1 };
            if (ACCESSORS)
              defineProperty2(O, 1, { enumerable: true, get: thrower });
            else
              O[1] = 1;
            method.call(O, argument0, argument1);
          });
        };
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var Menu_1 = tslib_1.__importDefault(__webpack_require__(95));
        var BtnMenu = function(_super) {
          tslib_1.__extends(BtnMenu2, _super);
          function BtnMenu2($elem, editor) {
            return _super.call(this, $elem, editor) || this;
          }
          return BtnMenu2;
        }(Menu_1["default"]);
        exports2["default"] = BtnMenu;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _setTimeout2 = _interopRequireDefault(__webpack_require__(46));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var Menu_1 = tslib_1.__importDefault(__webpack_require__(95));
        var DropList_1 = tslib_1.__importDefault(__webpack_require__(134));
        var DropListMenu = function(_super) {
          tslib_1.__extends(DropListMenu2, _super);
          function DropListMenu2($elem, editor, conf) {
            var _this = _super.call(this, $elem, editor) || this;
            conf.title = editor.i18next.t("menus.dropListMenu." + conf.title);
            var className = editor.config.lang === "zh-CN" ? "" : "w-e-drop-list-tl";
            if (className !== "" && conf.type === "list") {
              var _context;
              (0, _forEach["default"])(_context = conf.list).call(_context, function(item) {
                var $elem2 = item.$elem;
                var $children = dom_core_1["default"]($elem2.children());
                if ($children.length > 0) {
                  var nodeName = $children === null || $children === void 0 ? void 0 : $children.getNodeName();
                  if (nodeName && nodeName === "I") {
                    $elem2.addClass(className);
                  }
                }
              });
            }
            var dropList = new DropList_1["default"](_this, conf);
            _this.dropList = dropList;
            $elem.on("click", function() {
              var _context2;
              if (editor.selection.getRange() == null) {
                return;
              }
              $elem.css("z-index", editor.zIndex.get("menu"));
              (0, _forEach["default"])(_context2 = editor.txt.eventHooks.dropListMenuHoverEvents).call(_context2, function(fn) {
                return fn();
              });
              dropList.show();
            }).on("mouseleave", function() {
              $elem.css("z-index", "auto");
              dropList.hideTimeoutId = (0, _setTimeout2["default"])(function() {
                dropList.hide();
              });
            });
            return _this;
          }
          return DropListMenu2;
        }(Menu_1["default"]);
        exports2["default"] = DropListMenu;
      },
      function(module2, exports2, __webpack_require__) {
        var isObject2 = __webpack_require__(13);
        module2.exports = function(it) {
          if (!isObject2(it)) {
            throw TypeError(String(it) + " is not an object");
          }
          return it;
        };
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(188);
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(201);
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(213);
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(283);
      },
      function(module2, exports2, __webpack_require__) {
        var IndexedObject = __webpack_require__(72);
        var requireObjectCoercible = __webpack_require__(49);
        module2.exports = function(it) {
          return IndexedObject(requireObjectCoercible(it));
        };
      },
      function(module2, exports2, __webpack_require__) {
        var requireObjectCoercible = __webpack_require__(49);
        module2.exports = function(argument) {
          return Object(requireObjectCoercible(argument));
        };
      },
      function(module2, exports2, __webpack_require__) {
        var bind = __webpack_require__(40);
        var IndexedObject = __webpack_require__(72);
        var toObject = __webpack_require__(31);
        var toLength = __webpack_require__(35);
        var arraySpeciesCreate = __webpack_require__(88);
        var push = [].push;
        var createMethod = function(TYPE) {
          var IS_MAP = TYPE == 1;
          var IS_FILTER = TYPE == 2;
          var IS_SOME = TYPE == 3;
          var IS_EVERY = TYPE == 4;
          var IS_FIND_INDEX = TYPE == 6;
          var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
          return function($this, callbackfn, that, specificCreate) {
            var O = toObject($this);
            var self2 = IndexedObject(O);
            var boundFunction = bind(callbackfn, that, 3);
            var length = toLength(self2.length);
            var index2 = 0;
            var create = specificCreate || arraySpeciesCreate;
            var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : void 0;
            var value, result;
            for (; length > index2; index2++)
              if (NO_HOLES || index2 in self2) {
                value = self2[index2];
                result = boundFunction(value, index2, O);
                if (TYPE) {
                  if (IS_MAP)
                    target[index2] = result;
                  else if (result)
                    switch (TYPE) {
                      case 3:
                        return true;
                      case 5:
                        return value;
                      case 6:
                        return index2;
                      case 2:
                        push.call(target, value);
                    }
                  else if (IS_EVERY)
                    return false;
                }
              }
            return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
          };
        };
        module2.exports = {
          forEach: createMethod(0),
          map: createMethod(1),
          filter: createMethod(2),
          some: createMethod(3),
          every: createMethod(4),
          find: createMethod(5),
          findIndex: createMethod(6)
        };
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _find = _interopRequireDefault(__webpack_require__(29));
        var _set = _interopRequireDefault(__webpack_require__(132));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var const_1 = __webpack_require__(7);
        var Panel = function() {
          function Panel2(menu, conf) {
            this.menu = menu;
            this.conf = conf;
            this.$container = dom_core_1["default"]('<div class="w-e-panel-container"></div>');
            var editor = menu.editor;
            editor.txt.eventHooks.clickEvents.push(Panel2.hideCurAllPanels);
            editor.txt.eventHooks.toolbarClickEvents.push(Panel2.hideCurAllPanels);
            editor.txt.eventHooks.dropListMenuHoverEvents.push(Panel2.hideCurAllPanels);
          }
          Panel2.prototype.create = function() {
            var _this = this;
            var menu = this.menu;
            if (Panel2.createdMenus.has(menu)) {
              return;
            }
            var conf = this.conf;
            var $container = this.$container;
            var width = conf.width || 300;
            var rect = menu.editor.$toolbarElem.getBoundingClientRect();
            var menuRect = menu.$elem.getBoundingClientRect();
            var top = rect.height + rect.top - menuRect.top;
            var left = (rect.width - width) / 2 + rect.left - menuRect.left;
            var offset = 300;
            if (Math.abs(left) > offset) {
              if (menuRect.left < document.documentElement.clientWidth / 2) {
                left = -menuRect.width / 2;
              } else {
                left = -width + menuRect.width / 2;
              }
            }
            $container.css("width", width + "px").css("margin-top", top + "px").css("margin-left", left + "px").css("z-index", menu.editor.zIndex.get("panel"));
            var $closeBtn = dom_core_1["default"]('<i class="w-e-icon-close w-e-panel-close"></i>');
            $container.append($closeBtn);
            $closeBtn.on("click", function() {
              _this.remove();
            });
            var $tabTitleContainer = dom_core_1["default"]('<ul class="w-e-panel-tab-title"></ul>');
            var $tabContentContainer = dom_core_1["default"]('<div class="w-e-panel-tab-content"></div>');
            $container.append($tabTitleContainer).append($tabContentContainer);
            var height = conf.height;
            if (height) {
              $tabContentContainer.css("height", height + "px").css("overflow-y", "auto");
            }
            var tabs = conf.tabs || [];
            var tabTitleArr = [];
            var tabContentArr = [];
            (0, _forEach["default"])(tabs).call(tabs, function(tab, tabIndex) {
              if (!tab) {
                return;
              }
              var title = tab.title || "";
              var tpl = tab.tpl || "";
              var $title = dom_core_1["default"]('<li class="w-e-item">' + title + "</li>");
              $tabTitleContainer.append($title);
              var $content = dom_core_1["default"](tpl);
              $tabContentContainer.append($content);
              tabTitleArr.push($title);
              tabContentArr.push($content);
              if (tabIndex === 0) {
                $title.data("active", true);
                $title.addClass("w-e-active");
              } else {
                $content.hide();
              }
              $title.on("click", function() {
                if ($title.data("active")) {
                  return;
                }
                (0, _forEach["default"])(tabTitleArr).call(tabTitleArr, function($title2) {
                  $title2.data("active", false);
                  $title2.removeClass("w-e-active");
                });
                (0, _forEach["default"])(tabContentArr).call(tabContentArr, function($content2) {
                  $content2.hide();
                });
                $title.data("active", true);
                $title.addClass("w-e-active");
                $content.show();
              });
            });
            $container.on("click", function(e) {
              e.stopPropagation();
            });
            menu.$elem.append($container);
            conf.setLinkValue && conf.setLinkValue($container, "text");
            conf.setLinkValue && conf.setLinkValue($container, "link");
            (0, _forEach["default"])(tabs).call(tabs, function(tab, index2) {
              if (!tab) {
                return;
              }
              var events = tab.events || [];
              (0, _forEach["default"])(events).call(events, function(event) {
                var _a;
                var selector = event.selector;
                var type = event.type;
                var fn = event.fn || const_1.EMPTY_FN;
                var $content = tabContentArr[index2];
                var bindEnter = (_a = event.bindEnter) !== null && _a !== void 0 ? _a : false;
                var doneFn = function doneFn2(e) {
                  return tslib_1.__awaiter(_this, void 0, void 0, function() {
                    var needToHide;
                    return tslib_1.__generator(this, function(_a2) {
                      switch (_a2.label) {
                        case 0:
                          e.stopPropagation();
                          return [
                            4,
                            fn(e)
                          ];
                        case 1:
                          needToHide = _a2.sent();
                          if (needToHide) {
                            this.remove();
                          }
                          return [
                            2
                          ];
                      }
                    });
                  });
                };
                (0, _find["default"])($content).call($content, selector).on(type, doneFn);
                if (bindEnter && type === "click") {
                  $content.on("keyup", function(e) {
                    if (e.keyCode == 13) {
                      doneFn(e);
                    }
                  });
                }
              });
            });
            var $inputs = (0, _find["default"])($container).call($container, "input[type=text],textarea");
            if ($inputs.length) {
              $inputs.get(0).focus();
            }
            Panel2.hideCurAllPanels();
            menu.setPanel(this);
            Panel2.createdMenus.add(menu);
          };
          Panel2.prototype.remove = function() {
            var menu = this.menu;
            var $container = this.$container;
            if ($container) {
              $container.remove();
            }
            Panel2.createdMenus["delete"](menu);
          };
          Panel2.hideCurAllPanels = function() {
            var _context;
            if (Panel2.createdMenus.size === 0) {
              return;
            }
            (0, _forEach["default"])(_context = Panel2.createdMenus).call(_context, function(menu) {
              var panel = menu.panel;
              panel && panel.remove();
            });
          };
          Panel2.createdMenus = new _set["default"]();
          return Panel2;
        }();
        exports2["default"] = Panel;
      },
      function(module2, exports2) {
        var toString = {}.toString;
        module2.exports = function(it) {
          return toString.call(it).slice(8, -1);
        };
      },
      function(module2, exports2, __webpack_require__) {
        var toInteger = __webpack_require__(62);
        var min = Math.min;
        module2.exports = function(argument) {
          return argument > 0 ? min(toInteger(argument), 9007199254740991) : 0;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var path = __webpack_require__(9);
        var global2 = __webpack_require__(8);
        var aFunction = function(variable) {
          return typeof variable == "function" ? variable : void 0;
        };
        module2.exports = function(namespace, method) {
          return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global2[namespace]) : path[namespace] && path[namespace][method] || global2[namespace] && global2[namespace][method];
        };
      },
      function(module2, exports2, __webpack_require__) {
        var TO_STRING_TAG_SUPPORT = __webpack_require__(81);
        var defineProperty2 = __webpack_require__(18).f;
        var createNonEnumerableProperty = __webpack_require__(19);
        var has = __webpack_require__(16);
        var toString = __webpack_require__(170);
        var wellKnownSymbol = __webpack_require__(10);
        var TO_STRING_TAG = wellKnownSymbol("toStringTag");
        module2.exports = function(it, TAG, STATIC, SET_METHOD) {
          if (it) {
            var target = STATIC ? it : it.prototype;
            if (!has(target, TO_STRING_TAG)) {
              defineProperty2(target, TO_STRING_TAG, { configurable: true, value: TAG });
            }
            if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
              createNonEnumerableProperty(target, "toString", toString);
            }
          }
        };
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var Menu_1 = tslib_1.__importDefault(__webpack_require__(95));
        var PanelMenu = function(_super) {
          tslib_1.__extends(PanelMenu2, _super);
          function PanelMenu2($elem, editor) {
            return _super.call(this, $elem, editor) || this;
          }
          PanelMenu2.prototype.setPanel = function(panel) {
            this.panel = panel;
          };
          return PanelMenu2;
        }(Menu_1["default"]);
        exports2["default"] = PanelMenu;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _bind = _interopRequireDefault(__webpack_require__(57));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var Tooltip = function() {
          function Tooltip2(editor, $elem, conf) {
            this.editor = editor;
            this.$targetElem = $elem;
            this.conf = conf;
            this._show = false;
            this._isInsertTextContainer = false;
            var $container = dom_core_1["default"]("<div></div>");
            $container.addClass("w-e-tooltip");
            this.$container = $container;
          }
          Tooltip2.prototype.getPositionData = function() {
            var $container = this.$container;
            var top = 0;
            var left = 0;
            var tooltipHeight = 20;
            var pageScrollTop = document.documentElement.scrollTop;
            var targetElemRect = this.$targetElem.getBoundingClientRect();
            var textElemRect = this.editor.$textElem.getBoundingClientRect();
            var targetOffset = this.$targetElem.getOffsetData();
            var targetParentElem = dom_core_1["default"](targetOffset.parent);
            var scrollTop = this.editor.$textElem.elems[0].scrollTop;
            this._isInsertTextContainer = targetParentElem.equal(this.editor.$textContainerElem);
            if (this._isInsertTextContainer) {
              var targetParentElemHeight = targetParentElem.getBoundingClientRect().height;
              var offsetTop = targetOffset.top, offsetLeft = targetOffset.left, offsetHeight = targetOffset.height;
              var absoluteTop = offsetTop - scrollTop;
              if (absoluteTop > tooltipHeight + 5) {
                top = absoluteTop - tooltipHeight - 15;
                $container.addClass("w-e-tooltip-up");
              } else if (absoluteTop + offsetHeight + tooltipHeight < targetParentElemHeight) {
                top = absoluteTop + offsetHeight + 10;
                $container.addClass("w-e-tooltip-down");
              } else {
                top = (absoluteTop > 0 ? absoluteTop : 0) + tooltipHeight + 10;
                $container.addClass("w-e-tooltip-down");
              }
              if (offsetLeft < 0) {
                left = 0;
              } else {
                left = offsetLeft;
              }
            } else {
              if (targetElemRect.top < tooltipHeight) {
                top = targetElemRect.bottom + pageScrollTop + 5;
                $container.addClass("w-e-tooltip-down");
              } else if (targetElemRect.top - textElemRect.top < tooltipHeight) {
                top = targetElemRect.bottom + pageScrollTop + 5;
                $container.addClass("w-e-tooltip-down");
              } else {
                top = targetElemRect.top + pageScrollTop - tooltipHeight - 15;
                $container.addClass("w-e-tooltip-up");
              }
              if (targetElemRect.left < 0) {
                left = 0;
              } else {
                left = targetElemRect.left;
              }
            }
            return {
              top,
              left
            };
          };
          Tooltip2.prototype.appendMenus = function() {
            var _this = this;
            var conf = this.conf;
            var editor = this.editor;
            var $targetElem = this.$targetElem;
            var $container = this.$container;
            (0, _forEach["default"])(conf).call(conf, function(item, index2) {
              var $elem = item.$elem;
              var $wrapper = dom_core_1["default"]("<div></div>");
              $wrapper.addClass("w-e-tooltip-item-wrapper ");
              $wrapper.append($elem);
              $container.append($wrapper);
              $elem.on("click", function(e) {
                e.preventDefault();
                var res = item.onClick(editor, $targetElem);
                if (res)
                  _this.remove();
              });
            });
          };
          Tooltip2.prototype.create = function() {
            var _context, _context2;
            var editor = this.editor;
            var $container = this.$container;
            this.appendMenus();
            var _a = this.getPositionData(), top = _a.top, left = _a.left;
            $container.css("top", top + "px");
            $container.css("left", left + "px");
            $container.css("z-index", editor.zIndex.get("tooltip"));
            if (this._isInsertTextContainer) {
              this.editor.$textContainerElem.append($container);
            } else {
              dom_core_1["default"]("body").append($container);
            }
            this._show = true;
            editor.beforeDestroy((0, _bind["default"])(_context = this.remove).call(_context, this));
            editor.txt.eventHooks.onBlurEvents.push((0, _bind["default"])(_context2 = this.remove).call(_context2, this));
          };
          Tooltip2.prototype.remove = function() {
            this.$container.remove();
            this._show = false;
          };
          (0, _defineProperty2["default"])(Tooltip2.prototype, "isShow", {
            get: function get() {
              return this._show;
            },
            enumerable: false,
            configurable: true
          });
          return Tooltip2;
        }();
        exports2["default"] = Tooltip;
      },
      function(module2, exports2, __webpack_require__) {
        var aFunction = __webpack_require__(41);
        module2.exports = function(fn, that, length) {
          aFunction(fn);
          if (that === void 0)
            return fn;
          switch (length) {
            case 0:
              return function() {
                return fn.call(that);
              };
            case 1:
              return function(a) {
                return fn.call(that, a);
              };
            case 2:
              return function(a, b) {
                return fn.call(that, a, b);
              };
            case 3:
              return function(a, b, c) {
                return fn.call(that, a, b, c);
              };
          }
          return function() {
            return fn.apply(that, arguments);
          };
        };
      },
      function(module2, exports2) {
        module2.exports = function(it) {
          if (typeof it != "function") {
            throw TypeError(String(it) + " is not a function");
          }
          return it;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var NATIVE_WEAK_MAP = __webpack_require__(165);
        var global2 = __webpack_require__(8);
        var isObject2 = __webpack_require__(13);
        var createNonEnumerableProperty = __webpack_require__(19);
        var objectHas = __webpack_require__(16);
        var sharedKey = __webpack_require__(63);
        var hiddenKeys = __webpack_require__(51);
        var WeakMap2 = global2.WeakMap;
        var set, get, has;
        var enforce = function(it) {
          return has(it) ? get(it) : set(it, {});
        };
        var getterFor = function(TYPE) {
          return function(it) {
            var state;
            if (!isObject2(it) || (state = get(it)).type !== TYPE) {
              throw TypeError("Incompatible receiver, " + TYPE + " required");
            }
            return state;
          };
        };
        if (NATIVE_WEAK_MAP) {
          var store = new WeakMap2();
          var wmget = store.get;
          var wmhas = store.has;
          var wmset = store.set;
          set = function(it, metadata) {
            wmset.call(store, it, metadata);
            return metadata;
          };
          get = function(it) {
            return wmget.call(store, it) || {};
          };
          has = function(it) {
            return wmhas.call(store, it);
          };
        } else {
          var STATE = sharedKey("state");
          hiddenKeys[STATE] = true;
          set = function(it, metadata) {
            createNonEnumerableProperty(it, STATE, metadata);
            return metadata;
          };
          get = function(it) {
            return objectHas(it, STATE) ? it[STATE] : {};
          };
          has = function(it) {
            return objectHas(it, STATE);
          };
        }
        module2.exports = {
          set,
          get,
          has,
          enforce,
          getterFor
        };
      },
      function(module2, exports2) {
        module2.exports = true;
      },
      function(module2, exports2) {
        module2.exports = {};
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(261);
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(265);
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.createElementFragment = exports2.createDocumentFragment = exports2.createElement = exports2.insertBefore = exports2.getEndPoint = exports2.getStartPoint = exports2.updateRange = exports2.filterSelectionNodes = void 0;
        var tslib_1 = __webpack_require__(2);
        var _1 = __webpack_require__(137);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        function filterSelectionNodes($nodes) {
          var $listHtml = [];
          (0, _forEach["default"])($nodes).call($nodes, function($node) {
            var targerName = $node.getNodeName();
            if (targerName !== _1.ListType.OrderedList && targerName !== _1.ListType.UnorderedList) {
              $listHtml.push($node);
            } else {
              if ($node.prior) {
                $listHtml.push($node.prior);
              } else {
                var $children = $node.children();
                $children === null || $children === void 0 ? void 0 : (0, _forEach["default"])($children).call($children, function($li) {
                  $listHtml.push(dom_core_1["default"]($li));
                });
              }
            }
          });
          return $listHtml;
        }
        exports2.filterSelectionNodes = filterSelectionNodes;
        function updateRange(editor, $node, collapsed) {
          var selection = editor.selection;
          var range = document.createRange();
          if ($node.length > 1) {
            range.setStart($node.elems[0], 0);
            range.setEnd($node.elems[$node.length - 1], $node.elems[$node.length - 1].childNodes.length);
          } else {
            range.selectNodeContents($node.elems[0]);
          }
          collapsed && range.collapse(false);
          selection.saveRange(range);
          selection.restoreSelection();
        }
        exports2.updateRange = updateRange;
        function getStartPoint($startElem) {
          var _a;
          return $startElem.prior ? $startElem.prior : dom_core_1["default"]((_a = $startElem.children()) === null || _a === void 0 ? void 0 : _a.elems[0]);
        }
        exports2.getStartPoint = getStartPoint;
        function getEndPoint($endElem) {
          var _a;
          return $endElem.prior ? $endElem.prior : dom_core_1["default"]((_a = $endElem.children()) === null || _a === void 0 ? void 0 : _a.last().elems[0]);
        }
        exports2.getEndPoint = getEndPoint;
        function insertBefore($node, newNode, existingNode) {
          if (existingNode === void 0) {
            existingNode = null;
          }
          $node.parent().elems[0].insertBefore(newNode, existingNode);
        }
        exports2.insertBefore = insertBefore;
        function createElement(target) {
          return document.createElement(target);
        }
        exports2.createElement = createElement;
        function createDocumentFragment() {
          return document.createDocumentFragment();
        }
        exports2.createDocumentFragment = createDocumentFragment;
        function createElementFragment($nodes, $fragment, tag) {
          if (tag === void 0) {
            tag = "li";
          }
          (0, _forEach["default"])($nodes).call($nodes, function($node) {
            var $list = createElement(tag);
            $list.innerHTML = $node.html();
            $fragment.appendChild($list);
            $node.remove();
          });
          return $fragment;
        }
        exports2.createElementFragment = createElementFragment;
      },
      function(module2, exports2) {
        module2.exports = function(bitmap, value) {
          return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value
          };
        };
      },
      function(module2, exports2) {
        module2.exports = function(it) {
          if (it == void 0)
            throw TypeError("Can't call method on " + it);
          return it;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var charAt = __webpack_require__(164).charAt;
        var InternalStateModule = __webpack_require__(42);
        var defineIterator = __webpack_require__(75);
        var STRING_ITERATOR = "String Iterator";
        var setInternalState = InternalStateModule.set;
        var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);
        defineIterator(String, "String", function(iterated) {
          setInternalState(this, {
            type: STRING_ITERATOR,
            string: String(iterated),
            index: 0
          });
        }, function next() {
          var state = getInternalState(this);
          var string = state.string;
          var index2 = state.index;
          var point;
          if (index2 >= string.length)
            return { value: void 0, done: true };
          point = charAt(string, index2);
          state.index += point.length;
          return { value: point, done: false };
        });
      },
      function(module2, exports2) {
        module2.exports = {};
      },
      function(module2, exports2, __webpack_require__) {
        var internalObjectKeys = __webpack_require__(107);
        var enumBugKeys = __webpack_require__(80);
        module2.exports = Object.keys || function keys2(O) {
          return internalObjectKeys(O, enumBugKeys);
        };
      },
      function(module2, exports2, __webpack_require__) {
        var createNonEnumerableProperty = __webpack_require__(19);
        module2.exports = function(target, key, value, options) {
          if (options && options.enumerable)
            target[key] = value;
          else
            createNonEnumerableProperty(target, key, value);
        };
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(173);
        var DOMIterables = __webpack_require__(174);
        var global2 = __webpack_require__(8);
        var classof = __webpack_require__(65);
        var createNonEnumerableProperty = __webpack_require__(19);
        var Iterators = __webpack_require__(44);
        var wellKnownSymbol = __webpack_require__(10);
        var TO_STRING_TAG = wellKnownSymbol("toStringTag");
        for (var COLLECTION_NAME in DOMIterables) {
          var Collection = global2[COLLECTION_NAME];
          var CollectionPrototype = Collection && Collection.prototype;
          if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
            createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
          }
          Iterators[COLLECTION_NAME] = Iterators.Array;
        }
      },
      function(module2, exports2, __webpack_require__) {
        var classof = __webpack_require__(34);
        module2.exports = Array.isArray || function isArray2(arg) {
          return classof(arg) == "Array";
        };
      },
      function(module2, exports2, __webpack_require__) {
        var fails = __webpack_require__(11);
        var wellKnownSymbol = __webpack_require__(10);
        var V8_VERSION = __webpack_require__(86);
        var SPECIES = wellKnownSymbol("species");
        module2.exports = function(METHOD_NAME) {
          return V8_VERSION >= 51 || !fails(function() {
            var array = [];
            var constructor = array.constructor = {};
            constructor[SPECIES] = function() {
              return { foo: 1 };
            };
            return array[METHOD_NAME](Boolean).foo !== 1;
          });
        };
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(222);
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.ListHandle = void 0;
        var tslib_1 = __webpack_require__(2);
        var SelectionRangeElem_1 = tslib_1.__importDefault(__webpack_require__(373));
        var ListHandle = function() {
          function ListHandle2(options) {
            this.options = options;
            this.selectionRangeElem = new SelectionRangeElem_1["default"]();
          }
          return ListHandle2;
        }();
        exports2.ListHandle = ListHandle;
      },
      function(module2, exports2, __webpack_require__) {
        var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
        var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);
        exports2.f = NASHORN_BUG ? function propertyIsEnumerable2(V) {
          var descriptor = getOwnPropertyDescriptor(this, V);
          return !!descriptor && descriptor.enumerable;
        } : nativePropertyIsEnumerable;
      },
      function(module2, exports2, __webpack_require__) {
        var isObject2 = __webpack_require__(13);
        module2.exports = function(input, PREFERRED_STRING) {
          if (!isObject2(input))
            return input;
          var fn, val;
          if (PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject2(val = fn.call(input)))
            return val;
          if (typeof (fn = input.valueOf) == "function" && !isObject2(val = fn.call(input)))
            return val;
          if (!PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject2(val = fn.call(input)))
            return val;
          throw TypeError("Can't convert object to primitive value");
        };
      },
      function(module2, exports2) {
      },
      function(module2, exports2) {
        var ceil = Math.ceil;
        var floor = Math.floor;
        module2.exports = function(argument) {
          return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
        };
      },
      function(module2, exports2, __webpack_require__) {
        var shared = __webpack_require__(74);
        var uid = __webpack_require__(64);
        var keys2 = shared("keys");
        module2.exports = function(key) {
          return keys2[key] || (keys2[key] = uid(key));
        };
      },
      function(module2, exports2) {
        var id = 0;
        var postfix = Math.random();
        module2.exports = function(key) {
          return "Symbol(" + String(key === void 0 ? "" : key) + ")_" + (++id + postfix).toString(36);
        };
      },
      function(module2, exports2, __webpack_require__) {
        var TO_STRING_TAG_SUPPORT = __webpack_require__(81);
        var classofRaw = __webpack_require__(34);
        var wellKnownSymbol = __webpack_require__(10);
        var TO_STRING_TAG = wellKnownSymbol("toStringTag");
        var CORRECT_ARGUMENTS = classofRaw(function() {
          return arguments;
        }()) == "Arguments";
        var tryGet = function(it, key) {
          try {
            return it[key];
          } catch (error) {
          }
        };
        module2.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
          var O, tag, result;
          return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && typeof O.callee == "function" ? "Arguments" : result;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var anObject = __webpack_require__(25);
        var isArrayIteratorMethod = __webpack_require__(112);
        var toLength = __webpack_require__(35);
        var bind = __webpack_require__(40);
        var getIteratorMethod = __webpack_require__(113);
        var callWithSafeIterationClosing = __webpack_require__(114);
        var Result = function(stopped, result) {
          this.stopped = stopped;
          this.result = result;
        };
        var iterate = module2.exports = function(iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
          var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
          var iterator, iterFn, index2, length, result, next, step;
          if (IS_ITERATOR) {
            iterator = iterable;
          } else {
            iterFn = getIteratorMethod(iterable);
            if (typeof iterFn != "function")
              throw TypeError("Target is not iterable");
            if (isArrayIteratorMethod(iterFn)) {
              for (index2 = 0, length = toLength(iterable.length); length > index2; index2++) {
                result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index2])[0], step[1]) : boundFunction(iterable[index2]);
                if (result && result instanceof Result)
                  return result;
              }
              return new Result(false);
            }
            iterator = iterFn.call(iterable);
          }
          next = iterator.next;
          while (!(step = next.call(iterator)).done) {
            result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
            if (typeof result == "object" && result && result instanceof Result)
              return result;
          }
          return new Result(false);
        };
        iterate.stop = function(result) {
          return new Result(true, result);
        };
      },
      function(module2, exports2, __webpack_require__) {
        var fails = __webpack_require__(11);
        module2.exports = function(METHOD_NAME, argument) {
          var method = [][METHOD_NAME];
          return !!method && fails(function() {
            method.call(null, argument || function() {
              throw 1;
            }, 1);
          });
        };
      },
      function(module2, exports2) {
        module2.exports = "	\n\v\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
      },
      function(module2, exports2, __webpack_require__) {
        var toPrimitive = __webpack_require__(60);
        var definePropertyModule = __webpack_require__(18);
        var createPropertyDescriptor = __webpack_require__(48);
        module2.exports = function(object, key, value) {
          var propertyKey = toPrimitive(key);
          if (propertyKey in object)
            definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
          else
            object[propertyKey] = value;
        };
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(209);
      },
      function(module2, exports2, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__(14);
        var propertyIsEnumerableModule = __webpack_require__(59);
        var createPropertyDescriptor = __webpack_require__(48);
        var toIndexedObject = __webpack_require__(30);
        var toPrimitive = __webpack_require__(60);
        var has = __webpack_require__(16);
        var IE8_DOM_DEFINE = __webpack_require__(100);
        var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        exports2.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
          O = toIndexedObject(O);
          P = toPrimitive(P, true);
          if (IE8_DOM_DEFINE)
            try {
              return nativeGetOwnPropertyDescriptor(O, P);
            } catch (error) {
            }
          if (has(O, P))
            return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
        };
      },
      function(module2, exports2, __webpack_require__) {
        var fails = __webpack_require__(11);
        var classof = __webpack_require__(34);
        var split = "".split;
        module2.exports = fails(function() {
          return !Object("z").propertyIsEnumerable(0);
        }) ? function(it) {
          return classof(it) == "String" ? split.call(it, "") : Object(it);
        } : Object;
      },
      function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__(8);
        var isObject2 = __webpack_require__(13);
        var document2 = global2.document;
        var EXISTS = isObject2(document2) && isObject2(document2.createElement);
        module2.exports = function(it) {
          return EXISTS ? document2.createElement(it) : {};
        };
      },
      function(module2, exports2, __webpack_require__) {
        var IS_PURE = __webpack_require__(43);
        var store = __webpack_require__(103);
        (module2.exports = function(key, value) {
          return store[key] || (store[key] = value !== void 0 ? value : {});
        })("versions", []).push({
          version: "3.6.4",
          mode: IS_PURE ? "pure" : "global",
          copyright: "\xA9 2020 Denis Pushkarev (zloirock.ru)"
        });
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var createIteratorConstructor = __webpack_require__(167);
        var getPrototypeOf = __webpack_require__(105);
        var setPrototypeOf = __webpack_require__(171);
        var setToStringTag = __webpack_require__(37);
        var createNonEnumerableProperty = __webpack_require__(19);
        var redefine = __webpack_require__(53);
        var wellKnownSymbol = __webpack_require__(10);
        var IS_PURE = __webpack_require__(43);
        var Iterators = __webpack_require__(44);
        var IteratorsCore = __webpack_require__(104);
        var IteratorPrototype = IteratorsCore.IteratorPrototype;
        var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
        var ITERATOR = wellKnownSymbol("iterator");
        var KEYS = "keys";
        var VALUES = "values";
        var ENTRIES = "entries";
        var returnThis = function() {
          return this;
        };
        module2.exports = function(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
          createIteratorConstructor(IteratorConstructor, NAME, next);
          var getIterationMethod = function(KIND) {
            if (KIND === DEFAULT && defaultIterator)
              return defaultIterator;
            if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
              return IterablePrototype[KIND];
            switch (KIND) {
              case KEYS:
                return function keys2() {
                  return new IteratorConstructor(this, KIND);
                };
              case VALUES:
                return function values() {
                  return new IteratorConstructor(this, KIND);
                };
              case ENTRIES:
                return function entries() {
                  return new IteratorConstructor(this, KIND);
                };
            }
            return function() {
              return new IteratorConstructor(this);
            };
          };
          var TO_STRING_TAG = NAME + " Iterator";
          var INCORRECT_VALUES_NAME = false;
          var IterablePrototype = Iterable.prototype;
          var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype["@@iterator"] || DEFAULT && IterablePrototype[DEFAULT];
          var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
          var anyNativeIterator = NAME == "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
          var CurrentIteratorPrototype, methods, KEY;
          if (anyNativeIterator) {
            CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
            if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
              if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
                if (setPrototypeOf) {
                  setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
                } else if (typeof CurrentIteratorPrototype[ITERATOR] != "function") {
                  createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
                }
              }
              setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
              if (IS_PURE)
                Iterators[TO_STRING_TAG] = returnThis;
            }
          }
          if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
            INCORRECT_VALUES_NAME = true;
            defaultIterator = function values() {
              return nativeIterator.call(this);
            };
          }
          if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
            createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
          }
          Iterators[NAME] = defaultIterator;
          if (DEFAULT) {
            methods = {
              values: getIterationMethod(VALUES),
              keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
              entries: getIterationMethod(ENTRIES)
            };
            if (FORCED)
              for (KEY in methods) {
                if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
                  redefine(IterablePrototype, KEY, methods[KEY]);
                }
              }
            else
              $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
          }
          return methods;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var fails = __webpack_require__(11);
        module2.exports = !!Object.getOwnPropertySymbols && !fails(function() {
          return !String(Symbol());
        });
      },
      function(module2, exports2, __webpack_require__) {
        var anObject = __webpack_require__(25);
        var defineProperties = __webpack_require__(169);
        var enumBugKeys = __webpack_require__(80);
        var hiddenKeys = __webpack_require__(51);
        var html = __webpack_require__(108);
        var documentCreateElement = __webpack_require__(73);
        var sharedKey = __webpack_require__(63);
        var GT = ">";
        var LT = "<";
        var PROTOTYPE = "prototype";
        var SCRIPT = "script";
        var IE_PROTO = sharedKey("IE_PROTO");
        var EmptyConstructor = function() {
        };
        var scriptTag = function(content) {
          return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
        };
        var NullProtoObjectViaActiveX = function(activeXDocument2) {
          activeXDocument2.write(scriptTag(""));
          activeXDocument2.close();
          var temp = activeXDocument2.parentWindow.Object;
          activeXDocument2 = null;
          return temp;
        };
        var NullProtoObjectViaIFrame = function() {
          var iframe = documentCreateElement("iframe");
          var JS = "java" + SCRIPT + ":";
          var iframeDocument;
          iframe.style.display = "none";
          html.appendChild(iframe);
          iframe.src = String(JS);
          iframeDocument = iframe.contentWindow.document;
          iframeDocument.open();
          iframeDocument.write(scriptTag("document.F=Object"));
          iframeDocument.close();
          return iframeDocument.F;
        };
        var activeXDocument;
        var NullProtoObject = function() {
          try {
            activeXDocument = document.domain && new ActiveXObject("htmlfile");
          } catch (error) {
          }
          NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
          var length = enumBugKeys.length;
          while (length--)
            delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
          return NullProtoObject();
        };
        hiddenKeys[IE_PROTO] = true;
        module2.exports = Object.create || function create(O, Properties) {
          var result;
          if (O !== null) {
            EmptyConstructor[PROTOTYPE] = anObject(O);
            result = new EmptyConstructor();
            EmptyConstructor[PROTOTYPE] = null;
            result[IE_PROTO] = O;
          } else
            result = NullProtoObject();
          return Properties === void 0 ? result : defineProperties(result, Properties);
        };
      },
      function(module2, exports2, __webpack_require__) {
        var toIndexedObject = __webpack_require__(30);
        var toLength = __webpack_require__(35);
        var toAbsoluteIndex = __webpack_require__(79);
        var createMethod = function(IS_INCLUDES) {
          return function($this, el, fromIndex) {
            var O = toIndexedObject($this);
            var length = toLength(O.length);
            var index2 = toAbsoluteIndex(fromIndex, length);
            var value;
            if (IS_INCLUDES && el != el)
              while (length > index2) {
                value = O[index2++];
                if (value != value)
                  return true;
              }
            else
              for (; length > index2; index2++) {
                if ((IS_INCLUDES || index2 in O) && O[index2] === el)
                  return IS_INCLUDES || index2 || 0;
              }
            return !IS_INCLUDES && -1;
          };
        };
        module2.exports = {
          includes: createMethod(true),
          indexOf: createMethod(false)
        };
      },
      function(module2, exports2, __webpack_require__) {
        var toInteger = __webpack_require__(62);
        var max = Math.max;
        var min = Math.min;
        module2.exports = function(index2, length) {
          var integer = toInteger(index2);
          return integer < 0 ? max(integer + length, 0) : min(integer, length);
        };
      },
      function(module2, exports2) {
        module2.exports = [
          "constructor",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "toLocaleString",
          "toString",
          "valueOf"
        ];
      },
      function(module2, exports2, __webpack_require__) {
        var wellKnownSymbol = __webpack_require__(10);
        var TO_STRING_TAG = wellKnownSymbol("toStringTag");
        var test = {};
        test[TO_STRING_TAG] = "z";
        module2.exports = String(test) === "[object z]";
      },
      function(module2, exports2) {
        module2.exports = function() {
        };
      },
      function(module2, exports2) {
        module2.exports = function(it, Constructor, name) {
          if (!(it instanceof Constructor)) {
            throw TypeError("Incorrect " + (name ? name + " " : "") + "invocation");
          }
          return it;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var getBuiltIn = __webpack_require__(36);
        module2.exports = getBuiltIn("navigator", "userAgent") || "";
      },
      function(module2, exports2, __webpack_require__) {
        var aFunction = __webpack_require__(41);
        var PromiseCapability = function(C) {
          var resolve, reject;
          this.promise = new C(function($$resolve, $$reject) {
            if (resolve !== void 0 || reject !== void 0)
              throw TypeError("Bad Promise constructor");
            resolve = $$resolve;
            reject = $$reject;
          });
          this.resolve = aFunction(resolve);
          this.reject = aFunction(reject);
        };
        module2.exports.f = function(C) {
          return new PromiseCapability(C);
        };
      },
      function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__(8);
        var userAgent = __webpack_require__(84);
        var process = global2.process;
        var versions = process && process.versions;
        var v8 = versions && versions.v8;
        var match, version;
        if (v8) {
          match = v8.split(".");
          version = match[0] + match[1];
        } else if (userAgent) {
          match = userAgent.match(/Edge\/(\d+)/);
          if (!match || match[1] >= 74) {
            match = userAgent.match(/Chrome\/(\d+)/);
            if (match)
              version = match[1];
          }
        }
        module2.exports = version && +version;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var util_1 = __webpack_require__(6);
        var config_1 = tslib_1.__importDefault(__webpack_require__(267));
        var selection_1 = tslib_1.__importDefault(__webpack_require__(280));
        var command_1 = tslib_1.__importDefault(__webpack_require__(281));
        var index_1 = tslib_1.__importDefault(__webpack_require__(282));
        var index_2 = tslib_1.__importDefault(__webpack_require__(301));
        var init_dom_1 = tslib_1.__importStar(__webpack_require__(416));
        var init_selection_1 = tslib_1.__importDefault(__webpack_require__(417));
        var bind_event_1 = tslib_1.__importDefault(__webpack_require__(418));
        var i18next_init_1 = tslib_1.__importDefault(__webpack_require__(419));
        var set_full_screen_1 = tslib_1.__importStar(__webpack_require__(420));
        var scroll_to_head_1 = tslib_1.__importDefault(__webpack_require__(423));
        var z_index_1 = tslib_1.__importDefault(__webpack_require__(424));
        var index_3 = tslib_1.__importDefault(__webpack_require__(425));
        var index_4 = tslib_1.__importDefault(__webpack_require__(427));
        var disable_1 = tslib_1.__importDefault(__webpack_require__(437));
        var selection_change_1 = tslib_1.__importDefault(__webpack_require__(440));
        var plugins_1 = tslib_1.__importStar(__webpack_require__(441));
        var BtnMenu_1 = tslib_1.__importDefault(__webpack_require__(23));
        var DropList_1 = tslib_1.__importDefault(__webpack_require__(134));
        var DropListMenu_1 = tslib_1.__importDefault(__webpack_require__(24));
        var Panel_1 = tslib_1.__importDefault(__webpack_require__(33));
        var PanelMenu_1 = tslib_1.__importDefault(__webpack_require__(38));
        var Tooltip_1 = tslib_1.__importDefault(__webpack_require__(39));
        var EDITOR_ID = 1;
        var Editor = function() {
          function Editor2(toolbarSelector, textSelector) {
            this.pluginsFunctionList = {};
            this.beforeDestroyHooks = [];
            this.id = "wangEditor-" + EDITOR_ID++;
            this.toolbarSelector = toolbarSelector;
            this.textSelector = textSelector;
            init_dom_1.selectorValidator(this);
            this.config = util_1.deepClone(config_1["default"]);
            this.$toolbarElem = dom_core_1["default"]("<div></div>");
            this.$textContainerElem = dom_core_1["default"]("<div></div>");
            this.$textElem = dom_core_1["default"]("<div></div>");
            this.toolbarElemId = "";
            this.textElemId = "";
            this.isFocus = false;
            this.isComposing = false;
            this.isCompatibleMode = false;
            this.selection = new selection_1["default"](this);
            this.cmd = new command_1["default"](this);
            this.txt = new index_1["default"](this);
            this.menus = new index_2["default"](this);
            this.zIndex = new z_index_1["default"]();
            this.change = new index_3["default"](this);
            this.history = new index_4["default"](this);
            this.onSelectionChange = new selection_change_1["default"](this);
            var _a = disable_1["default"](this), disable = _a.disable, enable = _a.enable;
            this.disable = disable;
            this.enable = enable;
            this.isEnable = true;
          }
          Editor2.prototype.initSelection = function(newLine) {
            init_selection_1["default"](this, newLine);
          };
          Editor2.prototype.create = function() {
            this.zIndex.init(this);
            this.isCompatibleMode = this.config.compatibleMode();
            if (!this.isCompatibleMode) {
              this.config.onchangeTimeout = 30;
            }
            i18next_init_1["default"](this);
            init_dom_1["default"](this);
            this.txt.init();
            this.menus.init();
            set_full_screen_1["default"](this);
            this.initSelection(true);
            bind_event_1["default"](this);
            this.change.observe();
            this.history.observe();
            plugins_1["default"](this);
          };
          Editor2.prototype.beforeDestroy = function(fn) {
            this.beforeDestroyHooks.push(fn);
            return this;
          };
          Editor2.prototype.destroy = function() {
            var _context;
            var _this = this;
            (0, _forEach["default"])(_context = this.beforeDestroyHooks).call(_context, function(fn) {
              return fn.call(_this);
            });
            this.$toolbarElem.remove();
            this.$textContainerElem.remove();
          };
          Editor2.prototype.fullScreen = function() {
            set_full_screen_1.setFullScreen(this);
          };
          Editor2.prototype.unFullScreen = function() {
            set_full_screen_1.setUnFullScreen(this);
          };
          Editor2.prototype.scrollToHead = function(id) {
            scroll_to_head_1["default"](this, id);
          };
          Editor2.registerMenu = function(key, Menu) {
            if (!Menu || typeof Menu !== "function")
              return;
            Editor2.globalCustomMenuConstructorList[key] = Menu;
          };
          Editor2.prototype.registerPlugin = function(name, options) {
            plugins_1.registerPlugin(name, options, this.pluginsFunctionList);
          };
          Editor2.registerPlugin = function(name, options) {
            plugins_1.registerPlugin(name, options, Editor2.globalPluginsFunctionList);
          };
          Editor2.$ = dom_core_1["default"];
          Editor2.BtnMenu = BtnMenu_1["default"];
          Editor2.DropList = DropList_1["default"];
          Editor2.DropListMenu = DropListMenu_1["default"];
          Editor2.Panel = Panel_1["default"];
          Editor2.PanelMenu = PanelMenu_1["default"];
          Editor2.Tooltip = Tooltip_1["default"];
          Editor2.globalCustomMenuConstructorList = {};
          Editor2.globalPluginsFunctionList = {};
          return Editor2;
        }();
        exports2["default"] = Editor;
      },
      function(module2, exports2, __webpack_require__) {
        var isObject2 = __webpack_require__(13);
        var isArray2 = __webpack_require__(55);
        var wellKnownSymbol = __webpack_require__(10);
        var SPECIES = wellKnownSymbol("species");
        module2.exports = function(originalArray, length) {
          var C;
          if (isArray2(originalArray)) {
            C = originalArray.constructor;
            if (typeof C == "function" && (C === Array || isArray2(C.prototype)))
              C = void 0;
            else if (isObject2(C)) {
              C = C[SPECIES];
              if (C === null)
                C = void 0;
            }
          }
          return new (C === void 0 ? Array : C)(length === 0 ? 0 : length);
        };
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(185);
      },
      function(module2, exports2, __webpack_require__) {
        var requireObjectCoercible = __webpack_require__(49);
        var whitespaces = __webpack_require__(68);
        var whitespace = "[" + whitespaces + "]";
        var ltrim = RegExp("^" + whitespace + whitespace + "*");
        var rtrim = RegExp(whitespace + whitespace + "*$");
        var createMethod = function(TYPE) {
          return function($this) {
            var string = String(requireObjectCoercible($this));
            if (TYPE & 1)
              string = string.replace(ltrim, "");
            if (TYPE & 2)
              string = string.replace(rtrim, "");
            return string;
          };
        };
        module2.exports = {
          start: createMethod(1),
          end: createMethod(2),
          trim: createMethod(3)
        };
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(205);
      },
      function(module2, exports2, __webpack_require__) {
        var _Symbol$iterator = __webpack_require__(227);
        var _Symbol2 = __webpack_require__(230);
        function _typeof(obj) {
          "@babel/helpers - typeof";
          if (typeof _Symbol2 === "function" && typeof _Symbol$iterator === "symbol") {
            module2.exports = _typeof = function _typeof2(obj2) {
              return typeof obj2;
            };
          } else {
            module2.exports = _typeof = function _typeof2(obj2) {
              return obj2 && typeof _Symbol2 === "function" && obj2.constructor === _Symbol2 && obj2 !== _Symbol2.prototype ? "symbol" : typeof obj2;
            };
          }
          return _typeof(obj);
        }
        module2.exports = _typeof;
      },
      function(module2, exports2, __webpack_require__) {
        var wellKnownSymbol = __webpack_require__(10);
        exports2.f = wellKnownSymbol;
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(306);
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var Panel_1 = tslib_1.__importDefault(__webpack_require__(33));
        var Menu = function() {
          function Menu2($elem, editor) {
            var _this = this;
            this.$elem = $elem;
            this.editor = editor;
            this._active = false;
            $elem.on("click", function(e) {
              var _context;
              Panel_1["default"].hideCurAllPanels();
              (0, _forEach["default"])(_context = editor.txt.eventHooks.menuClickEvents).call(_context, function(fn) {
                return fn();
              });
              e.stopPropagation();
              if (editor.selection.getRange() == null) {
                return;
              }
              _this.clickHandler(e);
            });
          }
          Menu2.prototype.clickHandler = function(e) {
          };
          Menu2.prototype.active = function() {
            this._active = true;
            this.$elem.addClass("w-e-active");
          };
          Menu2.prototype.unActive = function() {
            this._active = false;
            this.$elem.removeClass("w-e-active");
          };
          (0, _defineProperty2["default"])(Menu2.prototype, "isActive", {
            get: function get() {
              return this._active;
            },
            enumerable: false,
            configurable: true
          });
          return Menu2;
        }();
        exports2["default"] = Menu;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _includes = _interopRequireDefault(__webpack_require__(28));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.getParentNodeA = exports2.EXTRA_TAG = void 0;
        exports2.EXTRA_TAG = ["B", "FONT", "I", "STRIKE"];
        function getParentNodeA(selectionELem) {
          var node = selectionELem.elems[0];
          while (node && (0, _includes["default"])(_context = exports2.EXTRA_TAG).call(_context, node.nodeName)) {
            var _context;
            node = node.parentElement;
            if (node.nodeName === "A") {
              return node;
            }
          }
        }
        exports2.getParentNodeA = getParentNodeA;
        function isActive(editor) {
          var _a;
          var $selectionELem = editor.selection.getSelectionContainerElem();
          if (!((_a = $selectionELem === null || $selectionELem === void 0 ? void 0 : $selectionELem.elems) === null || _a === void 0 ? void 0 : _a.length)) {
            return false;
          }
          if ($selectionELem.getNodeName() === "A") {
            return true;
          }
          var parentNode = getParentNodeA($selectionELem);
          if (parentNode && parentNode.nodeName === "A") {
            return true;
          }
          return false;
        }
        exports2["default"] = isActive;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _bind = _interopRequireDefault(__webpack_require__(57));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _indexOf = _interopRequireDefault(__webpack_require__(27));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var util_1 = __webpack_require__(6);
        var upload_core_1 = tslib_1.__importDefault(__webpack_require__(135));
        var progress_1 = tslib_1.__importDefault(__webpack_require__(136));
        var UploadImg = function() {
          function UploadImg2(editor) {
            this.editor = editor;
          }
          UploadImg2.prototype.insertImg = function(src, alt, href) {
            var editor = this.editor;
            var config = editor.config;
            var i18nPrefix = "validate.";
            var t = function t2(text, prefix) {
              if (prefix === void 0) {
                prefix = i18nPrefix;
              }
              return editor.i18next.t(prefix + text);
            };
            var resultSrc = src.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            resultSrc = resultSrc.replace("'", '"');
            var hrefText = "";
            if (href) {
              hrefText = href.replace("'", '"');
              hrefText = "data-href='" + encodeURIComponent(hrefText) + "' ";
            }
            var altText = "";
            if (alt) {
              altText = alt.replace(/</g, "&lt;").replace(/>/g, "&gt;");
              altText = altText.replace("'", '"');
              altText = "alt='" + altText + "' ";
            }
            editor.cmd["do"]("insertHTML", "<img src='" + resultSrc + "' " + altText + hrefText + 'style="max-width:100%;" contenteditable="false"/>');
            config.linkImgCallback(src, alt, href);
            var img = document.createElement("img");
            img.onload = function() {
              img = null;
            };
            img.onerror = function() {
              config.customAlert(t("\u63D2\u5165\u56FE\u7247\u9519\u8BEF"), "error", "wangEditor: " + t("\u63D2\u5165\u56FE\u7247\u9519\u8BEF") + "\uFF0C" + t("\u56FE\u7247\u94FE\u63A5") + ' "' + src + '"\uFF0C' + t("\u4E0B\u8F7D\u94FE\u63A5\u5931\u8D25"));
              img = null;
            };
            img.onabort = function() {
              return img = null;
            };
            img.src = src;
          };
          UploadImg2.prototype.uploadImg = function(files) {
            var _this_1 = this;
            if (!files.length) {
              return;
            }
            var editor = this.editor;
            var config = editor.config;
            var i18nPrefix = "validate.";
            var t = function t2(text) {
              return editor.i18next.t(i18nPrefix + text);
            };
            var uploadImgServer = config.uploadImgServer;
            var uploadImgShowBase64 = config.uploadImgShowBase64;
            var maxSize = config.uploadImgMaxSize;
            var maxSizeM = maxSize / 1024 / 1024;
            var maxLength = config.uploadImgMaxLength;
            var uploadFileName = config.uploadFileName;
            var uploadImgParams = config.uploadImgParams;
            var uploadImgParamsWithUrl = config.uploadImgParamsWithUrl;
            var uploadImgHeaders = config.uploadImgHeaders;
            var hooks = config.uploadImgHooks;
            var timeout = config.uploadImgTimeout;
            var withCredentials = config.withCredentials;
            var customUploadImg = config.customUploadImg;
            if (!customUploadImg) {
              if (!uploadImgServer && !uploadImgShowBase64) {
                return;
              }
            }
            var resultFiles = [];
            var errInfos = [];
            util_1.arrForEach(files, function(file) {
              if (!file)
                return;
              var name = file.name || file.type.replace("/", ".");
              var size = file.size;
              if (!name || !size) {
                return;
              }
              var imgType = editor.config.uploadImgAccept.join("|");
              var imgTypeRuleStr = ".(" + imgType + ")$";
              var uploadImgAcceptRule = new RegExp(imgTypeRuleStr, "i");
              if (uploadImgAcceptRule.test(name) === false) {
                errInfos.push("\u3010" + name + "\u3011" + t("\u4E0D\u662F\u56FE\u7247"));
                return;
              }
              if (maxSize < size) {
                errInfos.push("\u3010" + name + "\u3011" + t("\u5927\u4E8E") + " " + maxSizeM + "M");
                return;
              }
              resultFiles.push(file);
            });
            if (errInfos.length) {
              config.customAlert(t("\u56FE\u7247\u9A8C\u8BC1\u672A\u901A\u8FC7") + ": \n" + errInfos.join("\n"), "warning");
              return;
            }
            if (resultFiles.length === 0) {
              config.customAlert(t("\u4F20\u5165\u7684\u6587\u4EF6\u4E0D\u5408\u6CD5"), "warning");
              return;
            }
            if (resultFiles.length > maxLength) {
              config.customAlert(t("\u4E00\u6B21\u6700\u591A\u4E0A\u4F20") + maxLength + t("\u5F20\u56FE\u7247"), "warning");
              return;
            }
            if (customUploadImg && typeof customUploadImg === "function") {
              var _context;
              customUploadImg(resultFiles, (0, _bind["default"])(_context = this.insertImg).call(_context, this));
              return;
            }
            var formData = new FormData();
            (0, _forEach["default"])(resultFiles).call(resultFiles, function(file, index2) {
              var name = uploadFileName || file.name;
              if (resultFiles.length > 1) {
                name = name + (index2 + 1);
              }
              formData.append(name, file);
            });
            if (uploadImgServer) {
              var uploadImgServerArr = uploadImgServer.split("#");
              uploadImgServer = uploadImgServerArr[0];
              var uploadImgServerHash = uploadImgServerArr[1] || "";
              (0, _forEach["default"])(util_1).call(util_1, uploadImgParams, function(key, val) {
                if (uploadImgParamsWithUrl) {
                  if ((0, _indexOf["default"])(uploadImgServer).call(uploadImgServer, "?") > 0) {
                    uploadImgServer += "&";
                  } else {
                    uploadImgServer += "?";
                  }
                  uploadImgServer = uploadImgServer + key + "=" + val;
                }
                formData.append(key, val);
              });
              if (uploadImgServerHash) {
                uploadImgServer += "#" + uploadImgServerHash;
              }
              var xhr = upload_core_1["default"](uploadImgServer, {
                timeout,
                formData,
                headers: uploadImgHeaders,
                withCredentials: !!withCredentials,
                beforeSend: function beforeSend(xhr2) {
                  if (hooks.before)
                    return hooks.before(xhr2, editor, resultFiles);
                },
                onTimeout: function onTimeout(xhr2) {
                  config.customAlert(t("\u4E0A\u4F20\u56FE\u7247\u8D85\u65F6"), "error");
                  if (hooks.timeout)
                    hooks.timeout(xhr2, editor);
                },
                onProgress: function onProgress(percent, e) {
                  var progressBar = new progress_1["default"](editor);
                  if (e.lengthComputable) {
                    percent = e.loaded / e.total;
                    progressBar.show(percent);
                  }
                },
                onError: function onError(xhr2) {
                  config.customAlert(t("\u4E0A\u4F20\u56FE\u7247\u9519\u8BEF"), "error", t("\u4E0A\u4F20\u56FE\u7247\u9519\u8BEF") + "\uFF0C" + t("\u670D\u52A1\u5668\u8FD4\u56DE\u72B6\u6001") + ": " + xhr2.status);
                  if (hooks.error)
                    hooks.error(xhr2, editor);
                },
                onFail: function onFail(xhr2, resultStr) {
                  config.customAlert(t("\u4E0A\u4F20\u56FE\u7247\u5931\u8D25"), "error", t("\u4E0A\u4F20\u56FE\u7247\u8FD4\u56DE\u7ED3\u679C\u9519\u8BEF") + ("\uFF0C" + t("\u8FD4\u56DE\u7ED3\u679C") + ": ") + resultStr);
                  if (hooks.fail)
                    hooks.fail(xhr2, editor, resultStr);
                },
                onSuccess: function onSuccess(xhr2, result) {
                  if (hooks.customInsert) {
                    var _context2;
                    hooks.customInsert((0, _bind["default"])(_context2 = _this_1.insertImg).call(_context2, _this_1), result, editor);
                    return;
                  }
                  if (result.errno != "0") {
                    config.customAlert(t("\u4E0A\u4F20\u56FE\u7247\u5931\u8D25"), "error", t("\u4E0A\u4F20\u56FE\u7247\u8FD4\u56DE\u7ED3\u679C\u9519\u8BEF") + "\uFF0C" + t("\u8FD4\u56DE\u7ED3\u679C") + " errno=" + result.errno);
                    if (hooks.fail)
                      hooks.fail(xhr2, editor, result);
                    return;
                  }
                  var data = result.data;
                  (0, _forEach["default"])(data).call(data, function(link) {
                    if (typeof link === "string") {
                      _this_1.insertImg(link);
                    } else {
                      _this_1.insertImg(link.url, link.alt, link.href);
                    }
                  });
                  if (hooks.success)
                    hooks.success(xhr2, editor, result);
                }
              });
              if (typeof xhr === "string") {
                config.customAlert(xhr, "error");
              }
              return;
            }
            if (uploadImgShowBase64) {
              util_1.arrForEach(files, function(file) {
                var _this = _this_1;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function() {
                  if (!this.result)
                    return;
                  var imgLink = this.result.toString();
                  _this.insertImg(imgLink, imgLink);
                };
              });
            }
          };
          return UploadImg2;
        }();
        exports2["default"] = UploadImg;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _every = _interopRequireDefault(__webpack_require__(410));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _slice = _interopRequireDefault(__webpack_require__(45));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.dealTextNode = exports2.isAllTodo = exports2.isTodo = exports2.getCursorNextNode = void 0;
        function isTodo($topSelectElem) {
          if ($topSelectElem.length) {
            return $topSelectElem.attr("class") === "w-e-todo";
          }
          return false;
        }
        exports2.isTodo = isTodo;
        function isAllTodo(editor) {
          var $topSelectElems = editor.selection.getSelectionRangeTopNodes();
          if ($topSelectElems.length === 0)
            return;
          return (0, _every["default"])($topSelectElems).call($topSelectElems, function($topSelectElem) {
            return isTodo($topSelectElem);
          });
        }
        exports2.isAllTodo = isAllTodo;
        function getCursorNextNode(node, textNode, pos) {
          var _context;
          if (!node.hasChildNodes())
            return;
          var newNode = node.cloneNode();
          var end = false;
          if (textNode.nodeValue === "") {
            end = true;
          }
          var delArr = [];
          (0, _forEach["default"])(_context = node.childNodes).call(_context, function(v) {
            if (!isContains(v, textNode) && end) {
              newNode.appendChild(v.cloneNode(true));
              if (v.nodeName !== "BR") {
                delArr.push(v);
              }
            }
            if (isContains(v, textNode)) {
              if (v.nodeType === 1) {
                var childNode = getCursorNextNode(v, textNode, pos);
                if (childNode && childNode.textContent !== "")
                  newNode === null || newNode === void 0 ? void 0 : newNode.appendChild(childNode);
              }
              if (v.nodeType === 3) {
                if (textNode.isEqualNode(v)) {
                  var textContent = dealTextNode(v, pos);
                  newNode.textContent = textContent;
                }
              }
              end = true;
            }
          });
          (0, _forEach["default"])(delArr).call(delArr, function(v) {
            var node2 = v;
            node2.remove();
          });
          return newNode;
        }
        exports2.getCursorNextNode = getCursorNextNode;
        function isContains(node, otherNode) {
          if (node.nodeType === 3) {
            return node.nodeValue === otherNode.nodeValue;
          }
          return node.contains(otherNode);
        }
        function dealTextNode(node, pos, start) {
          if (start === void 0) {
            start = true;
          }
          var content = node.nodeValue;
          var oldContent = content === null || content === void 0 ? void 0 : (0, _slice["default"])(content).call(content, 0, pos);
          content = content === null || content === void 0 ? void 0 : (0, _slice["default"])(content).call(content, pos);
          if (!start) {
            var temp = content;
            content = oldContent;
            oldContent = temp;
          }
          node.nodeValue = oldContent;
          return content;
        }
        exports2.dealTextNode = dealTextNode;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var stack_1 = __webpack_require__(430);
        var Cache = function() {
          function Cache2(maxSize) {
            this.maxSize = maxSize;
            this.isRe = false;
            this.data = new stack_1.CeilStack(maxSize);
            this.revokeData = new stack_1.CeilStack(maxSize);
          }
          (0, _defineProperty2["default"])(Cache2.prototype, "size", {
            get: function get() {
              return [this.data.size, this.revokeData.size];
            },
            enumerable: false,
            configurable: true
          });
          Cache2.prototype.resetMaxSize = function(maxSize) {
            this.data.resetMax(maxSize);
            this.revokeData.resetMax(maxSize);
          };
          Cache2.prototype.save = function(data) {
            if (this.isRe) {
              this.revokeData.clear();
              this.isRe = false;
            }
            this.data.instack(data);
            return this;
          };
          Cache2.prototype.revoke = function(fn) {
            !this.isRe && (this.isRe = true);
            var data = this.data.outstack();
            if (data) {
              this.revokeData.instack(data);
              fn(data);
              return true;
            }
            return false;
          };
          Cache2.prototype.restore = function(fn) {
            !this.isRe && (this.isRe = true);
            var data = this.revokeData.outstack();
            if (data) {
              this.data.instack(data);
              fn(data);
              return true;
            }
            return false;
          };
          return Cache2;
        }();
        exports2["default"] = Cache;
      },
      function(module2, exports2, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__(14);
        var fails = __webpack_require__(11);
        var createElement = __webpack_require__(73);
        module2.exports = !DESCRIPTORS && !fails(function() {
          return Object.defineProperty(createElement("div"), "a", {
            get: function() {
              return 7;
            }
          }).a != 7;
        });
      },
      function(module2, exports2, __webpack_require__) {
        var fails = __webpack_require__(11);
        var replacement = /#|\.prototype\./;
        var isForced = function(feature, detection) {
          var value = data[normalize(feature)];
          return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == "function" ? fails(detection) : !!detection;
        };
        var normalize = isForced.normalize = function(string) {
          return String(string).replace(replacement, ".").toLowerCase();
        };
        var data = isForced.data = {};
        var NATIVE = isForced.NATIVE = "N";
        var POLYFILL = isForced.POLYFILL = "P";
        module2.exports = isForced;
      },
      function(module2, exports2, __webpack_require__) {
        var store = __webpack_require__(103);
        var functionToString = Function.toString;
        if (typeof store.inspectSource != "function") {
          store.inspectSource = function(it) {
            return functionToString.call(it);
          };
        }
        module2.exports = store.inspectSource;
      },
      function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__(8);
        var setGlobal = __webpack_require__(166);
        var SHARED = "__core-js_shared__";
        var store = global2[SHARED] || setGlobal(SHARED, {});
        module2.exports = store;
      },
      function(module2, exports2, __webpack_require__) {
        var getPrototypeOf = __webpack_require__(105);
        var createNonEnumerableProperty = __webpack_require__(19);
        var has = __webpack_require__(16);
        var wellKnownSymbol = __webpack_require__(10);
        var IS_PURE = __webpack_require__(43);
        var ITERATOR = wellKnownSymbol("iterator");
        var BUGGY_SAFARI_ITERATORS = false;
        var returnThis = function() {
          return this;
        };
        var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
        if ([].keys) {
          arrayIterator = [].keys();
          if (!("next" in arrayIterator))
            BUGGY_SAFARI_ITERATORS = true;
          else {
            PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
            if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
              IteratorPrototype = PrototypeOfArrayIteratorPrototype;
          }
        }
        if (IteratorPrototype == void 0)
          IteratorPrototype = {};
        if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
          createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
        }
        module2.exports = {
          IteratorPrototype,
          BUGGY_SAFARI_ITERATORS
        };
      },
      function(module2, exports2, __webpack_require__) {
        var has = __webpack_require__(16);
        var toObject = __webpack_require__(31);
        var sharedKey = __webpack_require__(63);
        var CORRECT_PROTOTYPE_GETTER = __webpack_require__(168);
        var IE_PROTO = sharedKey("IE_PROTO");
        var ObjectPrototype = Object.prototype;
        module2.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function(O) {
          O = toObject(O);
          if (has(O, IE_PROTO))
            return O[IE_PROTO];
          if (typeof O.constructor == "function" && O instanceof O.constructor) {
            return O.constructor.prototype;
          }
          return O instanceof Object ? ObjectPrototype : null;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var NATIVE_SYMBOL = __webpack_require__(76);
        module2.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";
      },
      function(module2, exports2, __webpack_require__) {
        var has = __webpack_require__(16);
        var toIndexedObject = __webpack_require__(30);
        var indexOf = __webpack_require__(78).indexOf;
        var hiddenKeys = __webpack_require__(51);
        module2.exports = function(object, names) {
          var O = toIndexedObject(object);
          var i = 0;
          var result = [];
          var key;
          for (key in O)
            !has(hiddenKeys, key) && has(O, key) && result.push(key);
          while (names.length > i)
            if (has(O, key = names[i++])) {
              ~indexOf(result, key) || result.push(key);
            }
          return result;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var getBuiltIn = __webpack_require__(36);
        module2.exports = getBuiltIn("document", "documentElement");
      },
      function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__(8);
        module2.exports = global2.Promise;
      },
      function(module2, exports2, __webpack_require__) {
        var redefine = __webpack_require__(53);
        module2.exports = function(target, src, options) {
          for (var key in src) {
            if (options && options.unsafe && target[key])
              target[key] = src[key];
            else
              redefine(target, key, src[key], options);
          }
          return target;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var getBuiltIn = __webpack_require__(36);
        var definePropertyModule = __webpack_require__(18);
        var wellKnownSymbol = __webpack_require__(10);
        var DESCRIPTORS = __webpack_require__(14);
        var SPECIES = wellKnownSymbol("species");
        module2.exports = function(CONSTRUCTOR_NAME) {
          var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
          var defineProperty2 = definePropertyModule.f;
          if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
            defineProperty2(Constructor, SPECIES, {
              configurable: true,
              get: function() {
                return this;
              }
            });
          }
        };
      },
      function(module2, exports2, __webpack_require__) {
        var wellKnownSymbol = __webpack_require__(10);
        var Iterators = __webpack_require__(44);
        var ITERATOR = wellKnownSymbol("iterator");
        var ArrayPrototype = Array.prototype;
        module2.exports = function(it) {
          return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
        };
      },
      function(module2, exports2, __webpack_require__) {
        var classof = __webpack_require__(65);
        var Iterators = __webpack_require__(44);
        var wellKnownSymbol = __webpack_require__(10);
        var ITERATOR = wellKnownSymbol("iterator");
        module2.exports = function(it) {
          if (it != void 0)
            return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)];
        };
      },
      function(module2, exports2, __webpack_require__) {
        var anObject = __webpack_require__(25);
        module2.exports = function(iterator, fn, value, ENTRIES) {
          try {
            return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
          } catch (error) {
            var returnMethod = iterator["return"];
            if (returnMethod !== void 0)
              anObject(returnMethod.call(iterator));
            throw error;
          }
        };
      },
      function(module2, exports2, __webpack_require__) {
        var wellKnownSymbol = __webpack_require__(10);
        var ITERATOR = wellKnownSymbol("iterator");
        var SAFE_CLOSING = false;
        try {
          var called = 0;
          var iteratorWithReturn = {
            next: function() {
              return { done: !!called++ };
            },
            "return": function() {
              SAFE_CLOSING = true;
            }
          };
          iteratorWithReturn[ITERATOR] = function() {
            return this;
          };
          Array.from(iteratorWithReturn, function() {
            throw 2;
          });
        } catch (error) {
        }
        module2.exports = function(exec, SKIP_CLOSING) {
          if (!SKIP_CLOSING && !SAFE_CLOSING)
            return false;
          var ITERATION_SUPPORT = false;
          try {
            var object = {};
            object[ITERATOR] = function() {
              return {
                next: function() {
                  return { done: ITERATION_SUPPORT = true };
                }
              };
            };
            exec(object);
          } catch (error) {
          }
          return ITERATION_SUPPORT;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var anObject = __webpack_require__(25);
        var aFunction = __webpack_require__(41);
        var wellKnownSymbol = __webpack_require__(10);
        var SPECIES = wellKnownSymbol("species");
        module2.exports = function(O, defaultConstructor) {
          var C = anObject(O).constructor;
          var S;
          return C === void 0 || (S = anObject(C)[SPECIES]) == void 0 ? defaultConstructor : aFunction(S);
        };
      },
      function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__(8);
        var fails = __webpack_require__(11);
        var classof = __webpack_require__(34);
        var bind = __webpack_require__(40);
        var html = __webpack_require__(108);
        var createElement = __webpack_require__(73);
        var IS_IOS = __webpack_require__(118);
        var location = global2.location;
        var set = global2.setImmediate;
        var clear = global2.clearImmediate;
        var process = global2.process;
        var MessageChannel = global2.MessageChannel;
        var Dispatch = global2.Dispatch;
        var counter = 0;
        var queue = {};
        var ONREADYSTATECHANGE = "onreadystatechange";
        var defer, channel, port;
        var run = function(id) {
          if (queue.hasOwnProperty(id)) {
            var fn = queue[id];
            delete queue[id];
            fn();
          }
        };
        var runner = function(id) {
          return function() {
            run(id);
          };
        };
        var listener = function(event) {
          run(event.data);
        };
        var post = function(id) {
          global2.postMessage(id + "", location.protocol + "//" + location.host);
        };
        if (!set || !clear) {
          set = function setImmediate(fn) {
            var args = [];
            var i = 1;
            while (arguments.length > i)
              args.push(arguments[i++]);
            queue[++counter] = function() {
              (typeof fn == "function" ? fn : Function(fn)).apply(void 0, args);
            };
            defer(counter);
            return counter;
          };
          clear = function clearImmediate(id) {
            delete queue[id];
          };
          if (classof(process) == "process") {
            defer = function(id) {
              process.nextTick(runner(id));
            };
          } else if (Dispatch && Dispatch.now) {
            defer = function(id) {
              Dispatch.now(runner(id));
            };
          } else if (MessageChannel && !IS_IOS) {
            channel = new MessageChannel();
            port = channel.port2;
            channel.port1.onmessage = listener;
            defer = bind(port.postMessage, port, 1);
          } else if (global2.addEventListener && typeof postMessage == "function" && !global2.importScripts && !fails(post) && location.protocol !== "file:") {
            defer = post;
            global2.addEventListener("message", listener, false);
          } else if (ONREADYSTATECHANGE in createElement("script")) {
            defer = function(id) {
              html.appendChild(createElement("script"))[ONREADYSTATECHANGE] = function() {
                html.removeChild(this);
                run(id);
              };
            };
          } else {
            defer = function(id) {
              setTimeout(runner(id), 0);
            };
          }
        }
        module2.exports = {
          set,
          clear
        };
      },
      function(module2, exports2, __webpack_require__) {
        var userAgent = __webpack_require__(84);
        module2.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);
      },
      function(module2, exports2, __webpack_require__) {
        var anObject = __webpack_require__(25);
        var isObject2 = __webpack_require__(13);
        var newPromiseCapability = __webpack_require__(85);
        module2.exports = function(C, x) {
          anObject(C);
          if (isObject2(x) && x.constructor === C)
            return x;
          var promiseCapability = newPromiseCapability.f(C);
          var resolve = promiseCapability.resolve;
          resolve(x);
          return promiseCapability.promise;
        };
      },
      function(module2, exports2) {
        module2.exports = function(exec) {
          try {
            return { error: false, value: exec() };
          } catch (error) {
            return { error: true, value: error };
          }
        };
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(197);
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var global2 = __webpack_require__(8);
        var InternalMetadataModule = __webpack_require__(123);
        var fails = __webpack_require__(11);
        var createNonEnumerableProperty = __webpack_require__(19);
        var iterate = __webpack_require__(66);
        var anInstance = __webpack_require__(83);
        var isObject2 = __webpack_require__(13);
        var setToStringTag = __webpack_require__(37);
        var defineProperty2 = __webpack_require__(18).f;
        var forEach = __webpack_require__(32).forEach;
        var DESCRIPTORS = __webpack_require__(14);
        var InternalStateModule = __webpack_require__(42);
        var setInternalState = InternalStateModule.set;
        var internalStateGetterFor = InternalStateModule.getterFor;
        module2.exports = function(CONSTRUCTOR_NAME, wrapper, common) {
          var IS_MAP = CONSTRUCTOR_NAME.indexOf("Map") !== -1;
          var IS_WEAK = CONSTRUCTOR_NAME.indexOf("Weak") !== -1;
          var ADDER = IS_MAP ? "set" : "add";
          var NativeConstructor = global2[CONSTRUCTOR_NAME];
          var NativePrototype = NativeConstructor && NativeConstructor.prototype;
          var exported = {};
          var Constructor;
          if (!DESCRIPTORS || typeof NativeConstructor != "function" || !(IS_WEAK || NativePrototype.forEach && !fails(function() {
            new NativeConstructor().entries().next();
          }))) {
            Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
            InternalMetadataModule.REQUIRED = true;
          } else {
            Constructor = wrapper(function(target, iterable) {
              setInternalState(anInstance(target, Constructor, CONSTRUCTOR_NAME), {
                type: CONSTRUCTOR_NAME,
                collection: new NativeConstructor()
              });
              if (iterable != void 0)
                iterate(iterable, target[ADDER], target, IS_MAP);
            });
            var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);
            forEach(["add", "clear", "delete", "forEach", "get", "has", "set", "keys", "values", "entries"], function(KEY) {
              var IS_ADDER = KEY == "add" || KEY == "set";
              if (KEY in NativePrototype && !(IS_WEAK && KEY == "clear")) {
                createNonEnumerableProperty(Constructor.prototype, KEY, function(a, b) {
                  var collection = getInternalState(this).collection;
                  if (!IS_ADDER && IS_WEAK && !isObject2(a))
                    return KEY == "get" ? void 0 : false;
                  var result = collection[KEY](a === 0 ? 0 : a, b);
                  return IS_ADDER ? this : result;
                });
              }
            });
            IS_WEAK || defineProperty2(Constructor.prototype, "size", {
              configurable: true,
              get: function() {
                return getInternalState(this).collection.size;
              }
            });
          }
          setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);
          exported[CONSTRUCTOR_NAME] = Constructor;
          $({ global: true, forced: true }, exported);
          if (!IS_WEAK)
            common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
          return Constructor;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var hiddenKeys = __webpack_require__(51);
        var isObject2 = __webpack_require__(13);
        var has = __webpack_require__(16);
        var defineProperty2 = __webpack_require__(18).f;
        var uid = __webpack_require__(64);
        var FREEZING = __webpack_require__(200);
        var METADATA = uid("meta");
        var id = 0;
        var isExtensible = Object.isExtensible || function() {
          return true;
        };
        var setMetadata = function(it) {
          defineProperty2(it, METADATA, { value: {
            objectID: "O" + ++id,
            weakData: {}
          } });
        };
        var fastKey = function(it, create) {
          if (!isObject2(it))
            return typeof it == "symbol" ? it : (typeof it == "string" ? "S" : "P") + it;
          if (!has(it, METADATA)) {
            if (!isExtensible(it))
              return "F";
            if (!create)
              return "E";
            setMetadata(it);
          }
          return it[METADATA].objectID;
        };
        var getWeakData = function(it, create) {
          if (!has(it, METADATA)) {
            if (!isExtensible(it))
              return true;
            if (!create)
              return false;
            setMetadata(it);
          }
          return it[METADATA].weakData;
        };
        var onFreeze = function(it) {
          if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA))
            setMetadata(it);
          return it;
        };
        var meta = module2.exports = {
          REQUIRED: false,
          fastKey,
          getWeakData,
          onFreeze
        };
        hiddenKeys[METADATA] = true;
      },
      function(module2, exports2, __webpack_require__) {
        var defineProperty2 = __webpack_require__(18).f;
        var create = __webpack_require__(77);
        var redefineAll = __webpack_require__(110);
        var bind = __webpack_require__(40);
        var anInstance = __webpack_require__(83);
        var iterate = __webpack_require__(66);
        var defineIterator = __webpack_require__(75);
        var setSpecies = __webpack_require__(111);
        var DESCRIPTORS = __webpack_require__(14);
        var fastKey = __webpack_require__(123).fastKey;
        var InternalStateModule = __webpack_require__(42);
        var setInternalState = InternalStateModule.set;
        var internalStateGetterFor = InternalStateModule.getterFor;
        module2.exports = {
          getConstructor: function(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
            var C = wrapper(function(that, iterable) {
              anInstance(that, C, CONSTRUCTOR_NAME);
              setInternalState(that, {
                type: CONSTRUCTOR_NAME,
                index: create(null),
                first: void 0,
                last: void 0,
                size: 0
              });
              if (!DESCRIPTORS)
                that.size = 0;
              if (iterable != void 0)
                iterate(iterable, that[ADDER], that, IS_MAP);
            });
            var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);
            var define = function(that, key, value) {
              var state = getInternalState(that);
              var entry = getEntry(that, key);
              var previous, index2;
              if (entry) {
                entry.value = value;
              } else {
                state.last = entry = {
                  index: index2 = fastKey(key, true),
                  key,
                  value,
                  previous: previous = state.last,
                  next: void 0,
                  removed: false
                };
                if (!state.first)
                  state.first = entry;
                if (previous)
                  previous.next = entry;
                if (DESCRIPTORS)
                  state.size++;
                else
                  that.size++;
                if (index2 !== "F")
                  state.index[index2] = entry;
              }
              return that;
            };
            var getEntry = function(that, key) {
              var state = getInternalState(that);
              var index2 = fastKey(key);
              var entry;
              if (index2 !== "F")
                return state.index[index2];
              for (entry = state.first; entry; entry = entry.next) {
                if (entry.key == key)
                  return entry;
              }
            };
            redefineAll(C.prototype, {
              clear: function clear() {
                var that = this;
                var state = getInternalState(that);
                var data = state.index;
                var entry = state.first;
                while (entry) {
                  entry.removed = true;
                  if (entry.previous)
                    entry.previous = entry.previous.next = void 0;
                  delete data[entry.index];
                  entry = entry.next;
                }
                state.first = state.last = void 0;
                if (DESCRIPTORS)
                  state.size = 0;
                else
                  that.size = 0;
              },
              "delete": function(key) {
                var that = this;
                var state = getInternalState(that);
                var entry = getEntry(that, key);
                if (entry) {
                  var next = entry.next;
                  var prev = entry.previous;
                  delete state.index[entry.index];
                  entry.removed = true;
                  if (prev)
                    prev.next = next;
                  if (next)
                    next.previous = prev;
                  if (state.first == entry)
                    state.first = next;
                  if (state.last == entry)
                    state.last = prev;
                  if (DESCRIPTORS)
                    state.size--;
                  else
                    that.size--;
                }
                return !!entry;
              },
              forEach: function forEach(callbackfn) {
                var state = getInternalState(this);
                var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : void 0, 3);
                var entry;
                while (entry = entry ? entry.next : state.first) {
                  boundFunction(entry.value, entry.key, this);
                  while (entry && entry.removed)
                    entry = entry.previous;
                }
              },
              has: function has(key) {
                return !!getEntry(this, key);
              }
            });
            redefineAll(C.prototype, IS_MAP ? {
              get: function get(key) {
                var entry = getEntry(this, key);
                return entry && entry.value;
              },
              set: function set(key, value) {
                return define(this, key === 0 ? 0 : key, value);
              }
            } : {
              add: function add(value) {
                return define(this, value = value === 0 ? 0 : value, value);
              }
            });
            if (DESCRIPTORS)
              defineProperty2(C.prototype, "size", {
                get: function() {
                  return getInternalState(this).size;
                }
              });
            return C;
          },
          setStrong: function(C, CONSTRUCTOR_NAME, IS_MAP) {
            var ITERATOR_NAME = CONSTRUCTOR_NAME + " Iterator";
            var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
            var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
            defineIterator(C, CONSTRUCTOR_NAME, function(iterated, kind) {
              setInternalState(this, {
                type: ITERATOR_NAME,
                target: iterated,
                state: getInternalCollectionState(iterated),
                kind,
                last: void 0
              });
            }, function() {
              var state = getInternalIteratorState(this);
              var kind = state.kind;
              var entry = state.last;
              while (entry && entry.removed)
                entry = entry.previous;
              if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
                state.target = void 0;
                return { value: void 0, done: true };
              }
              if (kind == "keys")
                return { value: entry.key, done: false };
              if (kind == "values")
                return { value: entry.value, done: false };
              return { value: [entry.key, entry.value], done: false };
            }, IS_MAP ? "entries" : "values", !IS_MAP, true);
            setSpecies(CONSTRUCTOR_NAME);
          }
        };
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("iterator");
      },
      function(module2, exports2, __webpack_require__) {
        var internalObjectKeys = __webpack_require__(107);
        var enumBugKeys = __webpack_require__(80);
        var hiddenKeys = enumBugKeys.concat("length", "prototype");
        exports2.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
          return internalObjectKeys(O, hiddenKeys);
        };
      },
      function(module2, exports2) {
        exports2.f = Object.getOwnPropertySymbols;
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(268);
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2["default"] = {
          zIndex: 1e4
        };
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2["default"] = {
          focus: true,
          height: 300,
          placeholder: "\u8BF7\u8F93\u5165\u6B63\u6587",
          zIndexFullScreen: 10002,
          showFullScreen: true
        };
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.getPasteImgs = exports2.getPasteHtml = exports2.getPasteText = void 0;
        var tslib_1 = __webpack_require__(2);
        var util_1 = __webpack_require__(6);
        var parse_html_1 = tslib_1.__importDefault(__webpack_require__(292));
        function getPasteText(e) {
          var clipboardData = e.clipboardData;
          var pasteText = "";
          if (clipboardData == null) {
            pasteText = window.clipboardData && window.clipboardData.getData("text");
          } else {
            pasteText = clipboardData.getData("text/plain");
          }
          return util_1.replaceHtmlSymbol(pasteText);
        }
        exports2.getPasteText = getPasteText;
        function getPasteHtml(e, filterStyle, ignoreImg) {
          if (filterStyle === void 0) {
            filterStyle = true;
          }
          if (ignoreImg === void 0) {
            ignoreImg = false;
          }
          var clipboardData = e.clipboardData;
          var pasteHtml = "";
          if (clipboardData) {
            pasteHtml = clipboardData.getData("text/html");
          }
          if (!pasteHtml) {
            var text = getPasteText(e);
            if (!text) {
              return "";
            }
            pasteHtml = "<p>" + text + "</p>";
          }
          pasteHtml = pasteHtml.replace(/<(\d)/gm, function(_, num) {
            return "&lt;" + num;
          });
          pasteHtml = pasteHtml.replace(/<(\/?meta.*?)>/gim, "");
          pasteHtml = parse_html_1["default"](pasteHtml, filterStyle, ignoreImg);
          return pasteHtml;
        }
        exports2.getPasteHtml = getPasteHtml;
        function getPasteImgs(e) {
          var _a;
          var result = [];
          var txt = getPasteText(e);
          if (txt) {
            return result;
          }
          var items = (_a = e.clipboardData) === null || _a === void 0 ? void 0 : _a.items;
          if (!items)
            return result;
          (0, _forEach["default"])(util_1).call(util_1, items, function(key, value) {
            var type = value.type;
            if (/image/i.test(type)) {
              result.push(value.getAsFile());
            }
          });
          return result;
        }
        exports2.getPasteImgs = getPasteImgs;
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(294);
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(310);
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _setTimeout2 = _interopRequireDefault(__webpack_require__(46));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var const_1 = __webpack_require__(7);
        var DropList = function() {
          function DropList2(menu, conf) {
            var _this = this;
            this.hideTimeoutId = 0;
            this.menu = menu;
            this.conf = conf;
            var $container = dom_core_1["default"]('<div class="w-e-droplist"></div>');
            var $title = dom_core_1["default"]("<p>" + conf.title + "</p>");
            $title.addClass("w-e-dp-title");
            $container.append($title);
            var list = conf.list || [];
            var type = conf.type || "list";
            var clickHandler = conf.clickHandler || const_1.EMPTY_FN;
            var $list = dom_core_1["default"]('<ul class="' + (type === "list" ? "w-e-list" : "w-e-block") + '"></ul>');
            (0, _forEach["default"])(list).call(list, function(item) {
              var $elem = item.$elem;
              var value = item.value;
              var $li = dom_core_1["default"]('<li class="w-e-item"></li>');
              if ($elem) {
                $li.append($elem);
                $list.append($li);
                $li.on("click", function(e) {
                  clickHandler(value);
                  e.stopPropagation();
                  _this.hideTimeoutId = (0, _setTimeout2["default"])(function() {
                    _this.hide();
                  });
                });
              }
            });
            $container.append($list);
            $container.on("mouseleave", function() {
              _this.hideTimeoutId = (0, _setTimeout2["default"])(function() {
                _this.hide();
              });
            });
            this.$container = $container;
            this.rendered = false;
            this._show = false;
          }
          DropList2.prototype.show = function() {
            if (this.hideTimeoutId) {
              clearTimeout(this.hideTimeoutId);
            }
            var menu = this.menu;
            var $menuELem = menu.$elem;
            var $container = this.$container;
            if (this._show) {
              return;
            }
            if (this.rendered) {
              $container.show();
            } else {
              var menuHeight = $menuELem.getBoundingClientRect().height || 0;
              var width = this.conf.width || 100;
              $container.css("margin-top", menuHeight + "px").css("width", width + "px");
              $menuELem.append($container);
              this.rendered = true;
            }
            this._show = true;
          };
          DropList2.prototype.hide = function() {
            var $container = this.$container;
            if (!this._show) {
              return;
            }
            $container.hide();
            this._show = false;
          };
          (0, _defineProperty2["default"])(DropList2.prototype, "isShow", {
            get: function get() {
              return this._show;
            },
            enumerable: false,
            configurable: true
          });
          return DropList2;
        }();
        exports2["default"] = DropList;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _typeof2 = _interopRequireDefault(__webpack_require__(92));
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var util_1 = __webpack_require__(6);
        function post(url, option) {
          var xhr = new XMLHttpRequest();
          xhr.open("POST", url);
          xhr.timeout = option.timeout || 10 * 1e3;
          xhr.ontimeout = function() {
            console.error("wangEditor - \u8BF7\u6C42\u8D85\u65F6");
            option.onTimeout && option.onTimeout(xhr);
          };
          if (xhr.upload) {
            xhr.upload.onprogress = function(e) {
              var percent = e.loaded / e.total;
              option.onProgress && option.onProgress(percent, e);
            };
          }
          if (option.headers) {
            (0, _forEach["default"])(util_1).call(util_1, option.headers, function(key, val) {
              xhr.setRequestHeader(key, val);
            });
          }
          xhr.withCredentials = !!option.withCredentials;
          if (option.beforeSend) {
            var beforeResult = option.beforeSend(xhr);
            if (beforeResult && (0, _typeof2["default"])(beforeResult) === "object") {
              if (beforeResult.prevent) {
                return beforeResult.msg;
              }
            }
          }
          xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4)
              return;
            var status = xhr.status;
            if (status < 200)
              return;
            if (status >= 300 && status < 400)
              return;
            if (status >= 400) {
              console.error("wangEditor - XHR \u62A5\u9519\uFF0C\u72B6\u6001\u7801 " + status);
              if (option.onError)
                option.onError(xhr);
              return;
            }
            var resultStr = xhr.responseText;
            var result;
            if ((0, _typeof2["default"])(resultStr) !== "object") {
              try {
                result = JSON.parse(resultStr);
              } catch (ex) {
                console.error("wangEditor - \u8FD4\u56DE\u7ED3\u679C\u4E0D\u662F JSON \u683C\u5F0F", resultStr);
                if (option.onFail)
                  option.onFail(xhr, resultStr);
                return;
              }
            } else {
              result = resultStr;
            }
            option.onSuccess(xhr, result);
          };
          xhr.send(option.formData || null);
          return xhr;
        }
        exports2["default"] = post;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _now = _interopRequireDefault(__webpack_require__(342));
        var _setTimeout2 = _interopRequireDefault(__webpack_require__(46));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var Progress = function() {
          function Progress2(editor) {
            this.editor = editor;
            this.$textContainer = editor.$textContainerElem;
            this.$bar = dom_core_1["default"]('<div class="w-e-progress"></div>');
            this.isShow = false;
            this.time = 0;
            this.timeoutId = 0;
          }
          Progress2.prototype.show = function(progress) {
            var _this = this;
            if (this.isShow) {
              return;
            }
            this.isShow = true;
            var $bar = this.$bar;
            var $textContainer = this.$textContainer;
            $textContainer.append($bar);
            if ((0, _now["default"])() - this.time > 100) {
              if (progress <= 1) {
                $bar.css("width", progress * 100 + "%");
                this.time = (0, _now["default"])();
              }
            }
            var timeoutId = this.timeoutId;
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
            this.timeoutId = (0, _setTimeout2["default"])(function() {
              _this.hide();
            }, 500);
          };
          Progress2.prototype.hide = function() {
            var $bar = this.$bar;
            $bar.remove();
            this.isShow = false;
            this.time = 0;
            this.timeoutId = 0;
          };
          return Progress2;
        }();
        exports2["default"] = Progress;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.ListType = void 0;
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var DropListMenu_1 = tslib_1.__importDefault(__webpack_require__(24));
        var utils_1 = __webpack_require__(47);
        var ListHandle_1 = tslib_1.__importStar(__webpack_require__(371));
        var ListType;
        (function(ListType2) {
          ListType2["OrderedList"] = "OL";
          ListType2["UnorderedList"] = "UL";
        })(ListType = exports2.ListType || (exports2.ListType = {}));
        var List = function(_super) {
          tslib_1.__extends(List2, _super);
          function List2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u5E8F\u5217">\n                <i class="w-e-icon-list2"></i>\n            </div>');
            var dropListConf = {
              width: 130,
              title: "\u5E8F\u5217",
              type: "list",
              list: [{
                $elem: dom_core_1["default"]('\n                        <p>\n                            <i class="w-e-icon-list2 w-e-drop-list-item"></i>\n                            ' + editor.i18next.t("menus.dropListMenu.list.\u65E0\u5E8F\u5217\u8868") + "\n                        <p>"),
                value: ListType.UnorderedList
              }, {
                $elem: dom_core_1["default"]('<p>\n                            <i class="w-e-icon-list-numbered w-e-drop-list-item"></i>\n                            ' + editor.i18next.t("menus.dropListMenu.list.\u6709\u5E8F\u5217\u8868") + "\n                        <p>"),
                value: ListType.OrderedList
              }],
              clickHandler: function clickHandler(value) {
                _this.command(value);
              }
            };
            _this = _super.call(this, $elem, editor, dropListConf) || this;
            return _this;
          }
          List2.prototype.command = function(type) {
            var editor = this.editor;
            var $selectionElem = editor.selection.getSelectionContainerElem();
            if ($selectionElem === void 0)
              return;
            this.handleSelectionRangeNodes(type);
            this.tryChangeActive();
          };
          List2.prototype.validator = function($startElem, $endElem, $textElem) {
            if (!$startElem.length || !$endElem.length || $textElem.equal($startElem) || $textElem.equal($endElem)) {
              return false;
            }
            return true;
          };
          List2.prototype.handleSelectionRangeNodes = function(listType) {
            var editor = this.editor;
            var selection = editor.selection;
            var listTarget = listType.toLowerCase();
            var $selectionElem = selection.getSelectionContainerElem();
            var $startElem = selection.getSelectionStartElem().getNodeTop(editor);
            var $endElem = selection.getSelectionEndElem().getNodeTop(editor);
            if (!this.validator($startElem, $endElem, editor.$textElem)) {
              return;
            }
            var _range = selection.getRange();
            var _collapsed = _range === null || _range === void 0 ? void 0 : _range.collapsed;
            if (!editor.$textElem.equal($selectionElem)) {
              $selectionElem = $selectionElem.getNodeTop(editor);
            }
            var options = {
              editor,
              listType,
              listTarget,
              $selectionElem,
              $startElem,
              $endElem
            };
            var classType;
            if (this.isOrderElem($selectionElem)) {
              classType = ListHandle_1.ClassType.Wrap;
            } else if (this.isOrderElem($startElem) && this.isOrderElem($endElem)) {
              classType = ListHandle_1.ClassType.Join;
            } else if (this.isOrderElem($startElem)) {
              classType = ListHandle_1.ClassType.StartJoin;
            } else if (this.isOrderElem($endElem)) {
              classType = ListHandle_1.ClassType.EndJoin;
            } else {
              classType = ListHandle_1.ClassType.Other;
            }
            var listHandleCmd = new ListHandle_1["default"](ListHandle_1.createListHandle(classType, options, _range));
            utils_1.updateRange(editor, listHandleCmd.getSelectionRangeElem(), !!_collapsed);
          };
          List2.prototype.isOrderElem = function($node) {
            var nodeName = $node.getNodeName();
            if (nodeName === ListType.OrderedList || nodeName === ListType.UnorderedList) {
              return true;
            }
            return false;
          };
          List2.prototype.tryChangeActive = function() {
          };
          return List2;
        }(DropListMenu_1["default"]);
        exports2["default"] = List;
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(395);
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        function isActive(editor) {
          var $selectionELem = editor.selection.getSelectionContainerElem();
          if (!($selectionELem === null || $selectionELem === void 0 ? void 0 : $selectionELem.length)) {
            return false;
          }
          if ($selectionELem.getNodeName() == "CODE" || $selectionELem.getNodeName() == "PRE" || $selectionELem.parent().getNodeName() == "CODE" || $selectionELem.parent().getNodeName() == "PRE" || /hljs/.test($selectionELem.parent().attr("class"))) {
            return true;
          } else {
            return false;
          }
        }
        exports2["default"] = isActive;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _find = _interopRequireDefault(__webpack_require__(29));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.todo = void 0;
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var todo = function() {
          function todo2($orginElem) {
            var _a;
            this.template = '<ul class="w-e-todo"><li><span contenteditable="false"><input type="checkbox"></span></li></ul>';
            this.checked = false;
            this.$todo = dom_core_1["default"](this.template);
            this.$child = (_a = $orginElem === null || $orginElem === void 0 ? void 0 : $orginElem.childNodes()) === null || _a === void 0 ? void 0 : _a.clone(true);
          }
          todo2.prototype.init = function() {
            var $child = this.$child;
            var $inputContainer = this.getInputContainer();
            if ($child) {
              $child.insertAfter($inputContainer);
            }
          };
          todo2.prototype.getInput = function() {
            var $todo = this.$todo;
            var $input = (0, _find["default"])($todo).call($todo, "input");
            return $input;
          };
          todo2.prototype.getInputContainer = function() {
            var $inputContainer = this.getInput().parent();
            return $inputContainer;
          };
          todo2.prototype.getTodo = function() {
            return this.$todo;
          };
          return todo2;
        }();
        exports2.todo = todo;
        function createTodo($orginElem) {
          var t = new todo($orginElem);
          t.init();
          return t;
        }
        exports2["default"] = createTodo;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        __webpack_require__(146);
        __webpack_require__(148);
        __webpack_require__(152);
        __webpack_require__(154);
        __webpack_require__(156);
        __webpack_require__(158);
        __webpack_require__(160);
        var index_1 = tslib_1.__importDefault(__webpack_require__(87));
        tslib_1.__exportStar(__webpack_require__(442), exports2);
        try {
          document;
        } catch (ex) {
          throw new Error("\u8BF7\u5728\u6D4F\u89C8\u5668\u73AF\u5883\u4E0B\u8FD0\u884C");
        }
        exports2["default"] = index_1["default"];
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(143);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(144);
        var path = __webpack_require__(9);
        var Object2 = path.Object;
        var defineProperty2 = module2.exports = function defineProperty3(it, key, desc) {
          return Object2.defineProperty(it, key, desc);
        };
        if (Object2.defineProperty.sham)
          defineProperty2.sham = true;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var DESCRIPTORS = __webpack_require__(14);
        var objectDefinePropertyModile = __webpack_require__(18);
        $({ target: "Object", stat: true, forced: !DESCRIPTORS, sham: !DESCRIPTORS }, {
          defineProperty: objectDefinePropertyModile.f
        });
      },
      function(module2, exports2) {
        var g;
        g = function() {
          return this;
        }();
        try {
          g = g || new Function("return this")();
        } catch (e) {
          if (typeof window === "object")
            g = window;
        }
        module2.exports = g;
      },
      function(module2, exports2, __webpack_require__) {
        var api = __webpack_require__(20);
        var content = __webpack_require__(147);
        content = content.__esModule ? content.default : content;
        if (typeof content === "string") {
          content = [[module2.i, content, ""]];
        }
        var options = {};
        options.insert = "head";
        options.singleton = false;
        api(content, options);
        module2.exports = content.locals || {};
      },
      function(module2, exports2, __webpack_require__) {
        var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(21);
        exports2 = ___CSS_LOADER_API_IMPORT___(false);
        exports2.push([module2.i, '.w-e-toolbar,\n.w-e-text-container,\n.w-e-menu-panel {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n  background-color: #fff;\n  /*\u8868\u60C5\u83DC\u5355\u6837\u5F0F*/\n  /*\u5206\u5272\u7EBF\u6837\u5F0F*/\n}\n.w-e-toolbar h1,\n.w-e-text-container h1,\n.w-e-menu-panel h1 {\n  font-size: 32px !important;\n}\n.w-e-toolbar h2,\n.w-e-text-container h2,\n.w-e-menu-panel h2 {\n  font-size: 24px !important;\n}\n.w-e-toolbar h3,\n.w-e-text-container h3,\n.w-e-menu-panel h3 {\n  font-size: 18.72px !important;\n}\n.w-e-toolbar h4,\n.w-e-text-container h4,\n.w-e-menu-panel h4 {\n  font-size: 16px !important;\n}\n.w-e-toolbar h5,\n.w-e-text-container h5,\n.w-e-menu-panel h5 {\n  font-size: 13.28px !important;\n}\n.w-e-toolbar p,\n.w-e-text-container p,\n.w-e-menu-panel p {\n  font-size: 16px !important;\n}\n.w-e-toolbar .eleImg,\n.w-e-text-container .eleImg,\n.w-e-menu-panel .eleImg {\n  cursor: pointer;\n  display: inline-block;\n  font-size: 18px;\n  padding: 0 3px;\n}\n.w-e-toolbar *,\n.w-e-text-container *,\n.w-e-menu-panel * {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\n.w-e-toolbar hr,\n.w-e-text-container hr,\n.w-e-menu-panel hr {\n  cursor: pointer;\n  display: block;\n  height: 0px;\n  border: 0;\n  border-top: 3px solid #ccc;\n  margin: 20px 0;\n}\n.w-e-clear-fix:after {\n  content: "";\n  display: table;\n  clear: both;\n}\n.w-e-drop-list-item {\n  position: relative;\n  top: 1px;\n  padding-right: 7px;\n  color: #333 !important;\n}\n.w-e-drop-list-tl {\n  padding-left: 10px;\n  text-align: left;\n}\n', ""]);
        module2.exports = exports2;
      },
      function(module2, exports2, __webpack_require__) {
        var api = __webpack_require__(20);
        var content = __webpack_require__(149);
        content = content.__esModule ? content.default : content;
        if (typeof content === "string") {
          content = [[module2.i, content, ""]];
        }
        var options = {};
        options.insert = "head";
        options.singleton = false;
        api(content, options);
        module2.exports = content.locals || {};
      },
      function(module2, exports2, __webpack_require__) {
        var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(21);
        var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(150);
        var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(151);
        exports2 = ___CSS_LOADER_API_IMPORT___(false);
        var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
        exports2.push([module2.i, "@font-face {\n  font-family: 'w-e-icon';\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + `) format('truetype');
  font-weight: normal;
  font-style: normal;
}
[class^="w-e-icon-"],
[class*=" w-e-icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'w-e-icon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.w-e-icon-close:before {
  content: "\\f00d";
}
.w-e-icon-upload2:before {
  content: "\\e9c6";
}
.w-e-icon-trash-o:before {
  content: "\\f014";
}
.w-e-icon-header:before {
  content: "\\f1dc";
}
.w-e-icon-pencil2:before {
  content: "\\e906";
}
.w-e-icon-paint-brush:before {
  content: "\\f1fc";
}
.w-e-icon-image:before {
  content: "\\e90d";
}
.w-e-icon-play:before {
  content: "\\e912";
}
.w-e-icon-location:before {
  content: "\\e947";
}
.w-e-icon-undo:before {
  content: "\\e965";
}
.w-e-icon-redo:before {
  content: "\\e966";
}
.w-e-icon-quotes-left:before {
  content: "\\e977";
}
.w-e-icon-list-numbered:before {
  content: "\\e9b9";
}
.w-e-icon-list2:before {
  content: "\\e9bb";
}
.w-e-icon-link:before {
  content: "\\e9cb";
}
.w-e-icon-happy:before {
  content: "\\e9df";
}
.w-e-icon-bold:before {
  content: "\\ea62";
}
.w-e-icon-underline:before {
  content: "\\ea63";
}
.w-e-icon-italic:before {
  content: "\\ea64";
}
.w-e-icon-strikethrough:before {
  content: "\\ea65";
}
.w-e-icon-table2:before {
  content: "\\ea71";
}
.w-e-icon-paragraph-left:before {
  content: "\\ea77";
}
.w-e-icon-paragraph-center:before {
  content: "\\ea78";
}
.w-e-icon-paragraph-right:before {
  content: "\\ea79";
}
.w-e-icon-paragraph-justify:before {
  content: "\\ea7a";
}
.w-e-icon-terminal:before {
  content: "\\f120";
}
.w-e-icon-page-break:before {
  content: "\\ea68";
}
.w-e-icon-cancel-circle:before {
  content: "\\ea0d";
}
.w-e-icon-font:before {
  content: "\\ea5c";
}
.w-e-icon-text-heigh:before {
  content: "\\ea5f";
}
.w-e-icon-paint-format:before {
  content: "\\e90c";
}
.w-e-icon-indent-increase:before {
  content: "\\ea7b";
}
.w-e-icon-indent-decrease:before {
  content: "\\ea7c";
}
.w-e-icon-row-height:before {
  content: "\\e9be";
}
.w-e-icon-fullscreen_exit:before {
  content: "\\e900";
}
.w-e-icon-fullscreen:before {
  content: "\\e901";
}
.w-e-icon-split-line:before {
  content: "\\ea0b";
}
.w-e-icon-checkbox-checked:before {
  content: "\\ea52";
}
`, ""]);
        module2.exports = exports2;
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = function(url, options) {
          if (!options) {
            options = {};
          }
          url = url && url.__esModule ? url.default : url;
          if (typeof url !== "string") {
            return url;
          }
          if (/^['"].*['"]$/.test(url)) {
            url = url.slice(1, -1);
          }
          if (options.hash) {
            url += options.hash;
          }
          if (/["'() \t\n]/.test(url) || options.needQuotes) {
            return '"'.concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"');
          }
          return url;
        };
      },
      function(module2, __webpack_exports__, __webpack_require__) {
        __webpack_require__.r(__webpack_exports__);
        __webpack_exports__["default"] = "data:font/woff;base64,d09GRgABAAAAABskAAsAAAAAGtgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIPFWNtYXAAAAFoAAABHAAAARz2mfAgZ2FzcAAAAoQAAAAIAAAACAAAABBnbHlmAAACjAAAFXwAABV8IH7+mGhlYWQAABgIAAAANgAAADYb6gumaGhlYQAAGEAAAAAkAAAAJAkjBWlobXR4AAAYZAAAAKQAAACkmYcEbmxvY2EAABkIAAAAVAAAAFReAmKYbWF4cAAAGVwAAAAgAAAAIAA0ALZuYW1lAAAZfAAAAYYAAAGGmUoJ+3Bvc3QAABsEAAAAIAAAACAAAwAAAAMD7wGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA8fwDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEAQAAAAA8ACAABAAcAAEAIOkB6QbpDekS6UfpZul36bnpu+m+6cbpy+nf6gvqDepS6lzqX+pl6nHqfPAN8BTxIPHc8fz//f//AAAAAAAg6QDpBukM6RLpR+ll6Xfpuem76b7pxunL6d/qC+oN6lLqXOpf6mLqcep38A3wFPEg8dzx/P/9//8AAf/jFwQXABb7FvcWwxamFpYWVRZUFlIWSxZHFjQWCRYIFcQVuxW5FbcVrBWnEBcQEQ8GDksOLAADAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAAEAEEAAQO/A38ABQALABEAFwAAATMVIREzAxEhFSMVATUzESE1ETUhESM1Av/A/sJ+fgE+wP4Cfv7CAT5+Ar9+AT78ggE+fsACvsD+wn7+An7+wsAAAAAABABBAAEDvwN/AAUACwARABcAAAEhESM1IxM1MxEhNQERIRUjFREVMxUhEQKBAT5+wMB+/sL9wAE+wMD+wgN//sLA/X7A/sJ+AcIBPn7A/v7AfgE+AAAAAAIAAP/ABAADwAAEABMAAAE3AScBAy4BJxM3ASMBAyUBNQEHAYCAAcBA/kCfFzsyY4ABgMD+gMACgAGA/oBOAUBAAcBA/kD+nTI7FwERTgGA/oD9gMABgMD+gIAAAgAA/8AEAAOAACkALQAAAREjNTQmIyEiBh0BFBYzITI2PQEzESEVIyIGFREUFjsBMjY1ETQmKwE1ASE1IQQAwCYa/UAaJiYaAsAaJoD9wCANExMNgA0TEw0gAUD9QALAAYABgEAaJiYawBomJhpA/wCAEw3+wA0TEw0BQA0TQAGAQAAABAAAAAAEAAOAABAAIQAtADQAAAE4ATEROAExITgBMRE4ATEhNSEiBhURFBYzITI2NRE0JiMHFAYjIiY1NDYzMhYTITUTATM3A8D8gAOA/IAaJiYaA4AaJiYagDgoKDg4KCg4QP0A4AEAQOADQP0AAwBAJhr9ABomJhoDABom4Cg4OCgoODj9uIABgP7AwAAAAgAAAEAEAANAADgAPAAAASYnLgEnJiMiBw4BBwYHBgcOAQcGFRQXHgEXFhcWFx4BFxYzMjc+ATc2NzY3PgE3NjU0Jy4BJyYnARENAQPVNjg5djw9Pz89PHY5ODYLBwgLAwMDAwsIBws2ODl2PD0/Pz08djk4NgsHCAsDAwMDCwgHC/2rAUD+wAMgCAYGCAICAgIIBgYIKSoqWS0uLy8uLVkqKikIBgYIAgICAggGBggpKipZLS4vLy4tWSoqKf3gAYDAwAAAAAACAMD/wANAA8AAGwAnAAABIgcOAQcGFRQXHgEXFjEwNz4BNzY1NCcuAScmAyImNTQ2MzIWFRQGAgBCOzpXGRkyMngyMjIyeDIyGRlXOjtCUHBwUFBwcAPAGRlXOjtCeH19zEFBQUHMfX14Qjs6VxkZ/gBwUFBwcFBQcAAAAQAAAAAEAAOAACsAAAEiBw4BBwYHJxEhJz4BMzIXHgEXFhUUBw4BBwYHFzY3PgE3NjU0Jy4BJyYjAgA1MjJcKSkjlgGAkDWLUFBFRmkeHgkJIhgYHlUoICAtDAwoKIteXWoDgAoLJxscI5b+gJA0PB4eaUZFUCsoKUkgIRpgIysrYjY2OWpdXosoKAABAAAAAAQAA4AAKgAAExQXHgEXFhc3JicuAScmNTQ3PgE3NjMyFhcHIREHJicuAScmIyIHDgEHBgAMDC0gIChVHhgYIgkJHh5pRkVQUIs1kAGAliMpKVwyMjVqXV6LKCgBgDk2NmIrKyNgGiEgSSkoK1BFRmkeHjw0kAGAliMcGycLCigoi15dAAAAAAIAAABABAEDAAAmAE0AABMyFx4BFxYVFAcOAQcGIyInLgEnJjUnNDc+ATc2MxUiBgcOAQc+ASEyFx4BFxYVFAcOAQcGIyInLgEnJjUnNDc+ATc2MxUiBgcOAQc+AeEuKSk9ERISET0pKS4uKSk9ERIBIyN6UlFdQHUtCRAHCBICSS4pKT0REhIRPSkpLi4pKT0REgEjI3pSUV1AdS0JEAcIEgIAEhE9KSkuLikpPRESEhE9KSkuIF1RUnojI4AwLggTCgIBEhE9KSkuLikpPRESEhE9KSkuIF1RUnojI4AwLggTCgIBAAAGAED/wAQAA8AAAwAHAAsAEQAdACkAACUhFSERIRUhESEVIScRIzUjNRMVMxUjNTc1IzUzFRURIzUzNSM1MzUjNQGAAoD9gAKA/YACgP2AwEBAQIDAgIDAwICAgICAgAIAgAIAgMD/AMBA/fIyQJI8MkCS7v7AQEBAQEAABgAA/8AEAAPAAAMABwALABcAIwAvAAABIRUhESEVIREhFSEBNDYzMhYVFAYjIiYRNDYzMhYVFAYjIiYRNDYzMhYVFAYjIiYBgAKA/YACgP2AAoD9gP6ASzU1S0s1NUtLNTVLSzU1S0s1NUtLNTVLA4CA/wCA/wCAA0A1S0s1NUtL/rU1S0s1NUtL/rU1S0s1NUtLAAUAAABABWADAAADAAcACwAOABEAABMhFSEVIRUhFSEVIQEXNzUnBwADgPyAA4D8gAOA/IAD4MDAwMADAMBAwEDAAUDAwEDAwAAAAAADAAAAAAQAA6AAAwANABQAADchFSElFSE1EyEVITUhJQkBIxEjEQAEAPwABAD8AIABAAEAAQD9YAEgASDggEBAwEBAAQCAgMABIP7g/wABAAAAAAACAB7/zAPiA7QAMwBkAAABIiYnJicmNDc2PwE+ATMyFhcWFxYUBwYPAQYiJyY0PwE2NCcuASMiBg8BBhQXFhQHDgEjAyImJyYnJjQ3Nj8BNjIXFhQPAQYUFx4BMzI2PwE2NCcmNDc2MhcWFxYUBwYPAQ4BIwG4ChMIIxISEhIjwCNZMTFZIyMSEhISI1gPLA8PD1gpKRQzHBwzFMApKQ8PCBMKuDFZIyMSEhISI1gPLA8PD1gpKRQzHBwzFMApKQ8PDysQIxISEhIjwCNZMQFECAckLS1eLS0kwCIlJSIkLS1eLS0kVxAQDysPWCl0KRQVFRTAKXQpDysQBwj+iCUiJC0tXi0tJFcQEA8rD1gpdCkUFRUUwCl0KQ8rEA8PJC0tXi0tJMAiJQAAAAAFAAD/wAQAA8AAGwA3AFMAXwBrAAAFMjc+ATc2NTQnLgEnJiMiBw4BBwYVFBceARcWEzIXHgEXFhUUBw4BBwYjIicuAScmNTQ3PgE3NhMyNz4BNzY3BgcOAQcGIyInLgEnJicWFx4BFxYnNDYzMhYVFAYjIiYlNDYzMhYVFAYjIiYCAGpdXosoKCgoi15dampdXosoKCgoi15dalZMTHEgISEgcUxMVlZMTHEgISEgcUxMVisrKlEmJiMFHBtWODc/Pzc4VhscBSMmJlEqK9UlGxslJRsbJQGAJRsbJSUbGyVAKCiLXl1qal1eiygoKCiLXl1qal1eiygoA6AhIHFMTFZWTExxICEhIHFMTFZWTExxICH+CQYGFRAQFEM6OlYYGRkYVjo6QxQQEBUGBvcoODgoKDg4KCg4OCgoODgAAAEAAAFABAACQAAPAAATFRQWMyEyNj0BNCYjISIGABMNA8ANExMN/EANEwIgwA0TEw3ADRMTAAAAAwAA/8AEAAPAABsANwBDAAABIgcOAQcGFRQXHgEXFjMyNz4BNzY1NCcuAScmAyInLgEnJjU0Nz4BNzYzMhceARcWFRQHDgEHBhMHJwcXBxc3FzcnNwIAal1eiygoKCiLXl1qal1eiygoKCiLXl1qVkxMcSAhISBxTExWVkxMcSAhISBxTExKoKBgoKBgoKBgoKADwCgoi15dampdXosoKCgoi15dampdXosoKPxgISBxTExWVkxMcSAhISBxTExWVkxMcSAhAqCgoGCgoGCgoGCgoAACAAD/wAQAA8AADwAVAAABISIGFREUFjMhMjY1ETQmASc3FwEXA4D9ADVLSzUDADVLS/4L7VqTATNaA8BLNf0ANUtLNQMANUv85e5akgEyWgAAAAABAGX/wAObA8AAKQAAASImIyIHDgEHBhUUFjMuATU0NjcwBwYCBwYHFSETMzcjNx4BMzI2Nw4BAyBEaEZxU1RtGhtJSAYNZUoQEEs8PFkBPWzGLNc0LVUmLlAYHT0DsBAeHWE+P0FNOwsmN5lvA31+/sWPkCMZAgCA9gkPN2sJBwAAAAACAAAAAAQAA4AACQAXAAAlMwcnMxEjNxcjJREnIxEzFSE1MxEjBxEDgICgoICAoKCA/wBAwID+gIDAQMDAwAIAwMDA/wCA/UBAQALAgAEAAAMAwAAAA0ADgAAWAB8AKAAAAT4BNTQnLgEnJiMhESEyNz4BNzY1NCYBMzIWFRQGKwETIxEzMhYVFAYCxBwgFBRGLi81/sABgDUvLkYUFET+hGUqPDwpZp+fnyw+PgHbIlQvNS8uRhQU/IAUFEYuLzVGdAFGSzU1S/6AAQBLNTVLAAAAAAIAwAAAA0ADgAAfACMAAAEzERQHDgEHBiMiJy4BJyY1ETMRFBYXHgEzMjY3PgE1ASEVIQLAgBkZVzo7QkI7OlcZGYAbGBxJKChJHBgb/gACgP2AA4D+YDw0NU4WFxcWTjU0PAGg/mAeOBcYGxsYFzge/qCAAAAAAAEAgAAAA4ADgAALAAABFSMBMxUhNTMBIzUDgID+wID+QIABQIADgED9AEBAAwBAAAEAAAAABAADgAA9AAABFSMeARUUBgcOASMiJicuATUzFBYzMjY1NCYjITUhLgEnLgE1NDY3PgEzMhYXHgEVIzQmIyIGFRQWMzIWFwQA6xUWNTAscT4+cSwwNYByTk5yck7+AAEsAgQBMDU1MCxxPj5xLDA1gHJOTnJyTjtuKwHAQB1BIjViJCEkJCEkYjU0TEw0NExAAQMBJGI1NWIkISQkISRiNTRMTDQ0TCEfAAAACgAAAAAEAAOAAAMABwALAA8AEwAXABsAHwAjACcAABMRIREBNSEVHQEhNQEVITUjFSE1ESEVISUhFSERNSEVASEVISE1IRUABAD9gAEA/wABAP8AQP8AAQD/AAKAAQD/AAEA/IABAP8AAoABAAOA/IADgP3AwMBAwMACAMDAwMD/AMDAwAEAwMD+wMDAwAAABQAAAAAEAAOAAAMABwALAA8AEwAAEyEVIRUhFSERIRUhESEVIREhFSEABAD8AAKA/YACgP2ABAD8AAQA/AADgIBAgP8AgAFAgP8AgAAAAAAFAAAAAAQAA4AAAwAHAAsADwATAAATIRUhFyEVIREhFSEDIRUhESEVIQAEAPwAwAKA/YACgP2AwAQA/AAEAPwAA4CAQID/AIABQID/AIAAAAUAAAAABAADgAADAAcACwAPABMAABMhFSEFIRUhESEVIQEhFSERIRUhAAQA/AABgAKA/YACgP2A/oAEAPwABAD8AAOAgECA/wCAAUCA/wCAAAAAAAUAAAAABAADgAADAAcACwAPABMAABMhFSEVIRUhFSEVIRUhFSEVIRUhAAQA/AAEAPwABAD8AAQA/AAEAPwAA4CAQIBAgECAQIAAAAAGAAAAAAQAA4AAAwAHAAsADwATABYAABMhFSEFIRUhFSEVIRUhFSEFIRUhGQEFAAQA/AABgAKA/YACgP2AAoD9gP6ABAD8AAEAA4CAQIBAgECAQIABAAGAwAAAAAYAAAAABAADgAADAAcACwAPABMAFgAAEyEVIQUhFSEVIRUhFSEVIQUhFSEBESUABAD8AAGAAoD9gAKA/YACgP2A/oAEAPwAAQD/AAOAgECAQIBAgECAAoD+gMAAAQA/AD8C5gLmACwAACUUDwEGIyIvAQcGIyIvASY1ND8BJyY1ND8BNjMyHwE3NjMyHwEWFRQPARcWFQLmEE4QFxcQqKgQFxYQThAQqKgQEE4QFhcQqKgQFxcQThAQqKgQwxYQThAQqKgQEE4QFhcQqKgQFxcQThAQqKgQEE4QFxcQqKgQFwAAAAYAAAAAAyUDbgAUACgAPABNAFUAggAAAREUBwYrASInJjURNDc2OwEyFxYVMxEUBwYrASInJjURNDc2OwEyFxYXERQHBisBIicmNRE0NzY7ATIXFhMRIREUFxYXFjMhMjc2NzY1ASEnJicjBgcFFRQHBisBERQHBiMhIicmNREjIicmPQE0NzY7ATc2NzY7ATIXFh8BMzIXFhUBJQYFCCQIBQYGBQgkCAUGkgUFCCUIBQUFBQglCAUFkgUFCCUIBQUFBQglCAUFSf4ABAQFBAIB2wIEBAQE/oABABsEBrUGBAH3BgUINxobJv4lJhsbNwgFBQUFCLEoCBcWF7cXFhYJKLAIBQYCEv63CAUFBQUIAUkIBQYGBQj+twgFBQUFCAFJCAUGBgUI/rcIBQUFBQgBSQgFBgYF/lsCHf3jDQsKBQUFBQoLDQJmQwUCAgVVJAgGBf3jMCIjISIvAiAFBggkCAUFYBUPDw8PFWAFBQgAAgAHAEkDtwKvABoALgAACQEGIyIvASY1ND8BJyY1ND8BNjMyFwEWFRQHARUUBwYjISInJj0BNDc2MyEyFxYBTv72BgcIBR0GBuHhBgYdBQgHBgEKBgYCaQUFCP3bCAUFBQUIAiUIBQUBhf72BgYcBggHBuDhBgcHBh0FBf71BQgHBv77JQgFBQUFCCUIBQUFBQAAAAEAIwAAA90DbgCzAAAlIicmIyIHBiMiJyY1NDc2NzY3Njc2PQE0JyYjISIHBh0BFBcWFxYzFhcWFRQHBiMiJyYjIgcGIyInJjU0NzY3Njc2NzY9ARE0NTQ1NCc0JyYnJicmJyYnJiMiJyY1NDc2MzIXFjMyNzYzMhcWFRQHBiMGBwYHBh0BFBcWMyEyNzY9ATQnJicmJyY1NDc2MzIXFjMyNzYzMhcWFRQHBgciBwYHBhURFBcWFxYXMhcWFRQHBiMDwRkzMhoZMjMZDQgHCQoNDBEQChIBBxX+fhYHARUJEhMODgwLBwcOGzU1GhgxMRgNBwcJCQsMEA8JEgECAQIDBAQFCBIRDQ0KCwcHDho1NRoYMDEYDgcHCQoMDRAQCBQBBw8BkA4HARQKFxcPDgcHDhkzMhkZMTEZDgcHCgoNDRARCBQUCRERDg0KCwcHDgACAgICDAsPEQkJAQEDAwUMROAMBQMDBQzUUQ0GAQIBCAgSDwwNAgICAgwMDhEICQECAwMFDUUhAdACDQ0ICA4OCgoLCwcHAwYBAQgIEg8MDQICAgINDA8RCAgBAgEGDFC2DAcBAQcMtlAMBgEBBgcWDwwNAgICAg0MDxEICAEBAgYNT/3mRAwGAgIBCQgRDwwNAAACAAD/twP/A7cAEwA5AAABMhcWFRQHAgcGIyInJjU0NwE2MwEWFxYfARYHBiMiJyYnJicmNRYXFhcWFxYzMjc2NzY3Njc2NzY3A5soHh4avkw3RUg0NDUBbSEp/fgXJicvAQJMTHtHNjYhIRARBBMUEBASEQkXCA8SExUVHR0eHikDtxsaKCQz/plGNDU0SUkwAUsf/bErHx8NKHpNTBobLi86OkQDDw4LCwoKFiUbGhERCgsEBAIAAQAAAAAAAIWwaoFfDzz1AAsEAAAAAADbteOZAAAAANu145kAAP+3BWADwAAAAAgAAgAAAAAAAAABAAADwP/AAAAFgAAA//8FYAABAAAAAAAAAAAAAAAAAAAAKQQAAAAAAAAAAAAAAAIAAAAEAABBBAAAQQQAAAAEAAAABAAAAAQAAAAEAADABAAAAAQAAAAEAAAABAAAQAQAAAAFgAAABAAAAAQAAB4EAAAABAAAAAQAAAAEAAAABAAAZQQAAAAEAADABAAAwAQAAIAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAMlAD8DJQAAA74ABwQAACMD/wAAAAAAAAAKABQAHgBKAHYApADmAS4BkgHQAhYCXALQAw4DWAN+A6gEPgTeBPoFZAWOBdAF+AY6BnYGjgbmBy4HVgd+B6gHzgf8CCoIbgkmCXAKYgq+AAEAAAApALQACgAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAHAAAAAQAAAAAAAgAHAGAAAQAAAAAAAwAHADYAAQAAAAAABAAHAHUAAQAAAAAABQALABUAAQAAAAAABgAHAEsAAQAAAAAACgAaAIoAAwABBAkAAQAOAAcAAwABBAkAAgAOAGcAAwABBAkAAwAOAD0AAwABBAkABAAOAHwAAwABBAkABQAWACAAAwABBAkABgAOAFIAAwABBAkACgA0AKRpY29tb29uAGkAYwBvAG0AbwBvAG5WZXJzaW9uIDEuMABWAGUAcgBzAGkAbwBuACAAMQAuADBpY29tb29uAGkAYwBvAG0AbwBvAG5pY29tb29uAGkAYwBvAG0AbwBvAG5SZWd1bGFyAFIAZQBnAHUAbABhAHJpY29tb29uAGkAYwBvAG0AbwBvAG5Gb250IGdlbmVyYXRlZCBieSBJY29Nb29uLgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      },
      function(module2, exports2, __webpack_require__) {
        var api = __webpack_require__(20);
        var content = __webpack_require__(153);
        content = content.__esModule ? content.default : content;
        if (typeof content === "string") {
          content = [[module2.i, content, ""]];
        }
        var options = {};
        options.insert = "head";
        options.singleton = false;
        api(content, options);
        module2.exports = content.locals || {};
      },
      function(module2, exports2, __webpack_require__) {
        var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(21);
        exports2 = ___CSS_LOADER_API_IMPORT___(false);
        exports2.push([module2.i, '.w-e-toolbar {\n  display: flex;\n  padding: 0 6px;\n  flex-wrap: wrap;\n  position: relative;\n  /* \u5355\u4E2A\u83DC\u5355 */\n}\n.w-e-toolbar .w-e-menu {\n  position: relative;\n  display: flex;\n  width: 40px;\n  height: 40px;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  cursor: pointer;\n}\n.w-e-toolbar .w-e-menu i {\n  color: #999;\n}\n.w-e-toolbar .w-e-menu:hover {\n  background-color: #F6F6F6;\n}\n.w-e-toolbar .w-e-menu:hover i {\n  color: #333;\n}\n.w-e-toolbar .w-e-active i {\n  color: #1e88e5;\n}\n.w-e-toolbar .w-e-active:hover i {\n  color: #1e88e5;\n}\n.w-e-menu-tooltip {\n  position: absolute;\n  display: flex;\n  color: #f1f1f1;\n  background-color: rgba(0, 0, 0, 0.75);\n  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  padding: 4px 5px 6px;\n  justify-content: center;\n  align-items: center;\n}\n.w-e-menu-tooltip-up::after {\n  content: "";\n  position: absolute;\n  top: 100%;\n  left: 50%;\n  margin-left: -5px;\n  border: 5px solid rgba(0, 0, 0, 0);\n  border-top-color: rgba(0, 0, 0, 0.73);\n}\n.w-e-menu-tooltip-down::after {\n  content: "";\n  position: absolute;\n  bottom: 100%;\n  left: 50%;\n  margin-left: -5px;\n  border: 5px solid rgba(0, 0, 0, 0);\n  border-bottom-color: rgba(0, 0, 0, 0.73);\n}\n.w-e-menu-tooltip-item-wrapper {\n  font-size: 14px;\n  margin: 0 5px;\n}\n', ""]);
        module2.exports = exports2;
      },
      function(module2, exports2, __webpack_require__) {
        var api = __webpack_require__(20);
        var content = __webpack_require__(155);
        content = content.__esModule ? content.default : content;
        if (typeof content === "string") {
          content = [[module2.i, content, ""]];
        }
        var options = {};
        options.insert = "head";
        options.singleton = false;
        api(content, options);
        module2.exports = content.locals || {};
      },
      function(module2, exports2, __webpack_require__) {
        var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(21);
        exports2 = ___CSS_LOADER_API_IMPORT___(false);
        exports2.push([module2.i, '.w-e-text-container {\n  position: relative;\n  height: 100%;\n}\n.w-e-text-container .w-e-progress {\n  position: absolute;\n  background-color: #1e88e5;\n  top: 0;\n  left: 0;\n  height: 1px;\n}\n.w-e-text-container .placeholder {\n  color: #D4D4D4;\n  position: absolute;\n  font-size: 11pt;\n  line-height: 22px;\n  left: 10px;\n  top: 10px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  z-index: -1;\n}\n.w-e-text {\n  padding: 0 10px;\n  overflow-y: auto;\n}\n.w-e-text p,\n.w-e-text h1,\n.w-e-text h2,\n.w-e-text h3,\n.w-e-text h4,\n.w-e-text h5,\n.w-e-text table,\n.w-e-text pre {\n  margin: 10px 0;\n  line-height: 1.5;\n}\n.w-e-text ul,\n.w-e-text ol {\n  margin: 10px 0 10px 20px;\n}\n.w-e-text blockquote {\n  display: block;\n  border-left: 8px solid #d0e5f2;\n  padding: 5px 10px;\n  margin: 10px 0;\n  line-height: 1.4;\n  font-size: 100%;\n  background-color: #f1f1f1;\n}\n.w-e-text code {\n  display: inline-block;\n  background-color: #f1f1f1;\n  border-radius: 3px;\n  padding: 3px 5px;\n  margin: 0 3px;\n}\n.w-e-text pre code {\n  display: block;\n}\n.w-e-text table {\n  border-top: 1px solid #ccc;\n  border-left: 1px solid #ccc;\n}\n.w-e-text table td,\n.w-e-text table th {\n  border-bottom: 1px solid #ccc;\n  border-right: 1px solid #ccc;\n  padding: 3px 5px;\n  min-height: 30px;\n  height: 30px;\n}\n.w-e-text table th {\n  border-bottom: 2px solid #ccc;\n  text-align: center;\n  background-color: #f1f1f1;\n}\n.w-e-text:focus {\n  outline: none;\n}\n.w-e-text img {\n  cursor: pointer;\n}\n.w-e-text img:hover {\n  box-shadow: 0 0 5px #333;\n}\n.w-e-text .w-e-todo {\n  margin: 0 0 0 20px;\n}\n.w-e-text .w-e-todo li {\n  list-style: none;\n  font-size: 1em;\n}\n.w-e-text .w-e-todo li span:nth-child(1) {\n  position: relative;\n  left: -18px;\n}\n.w-e-text .w-e-todo li span:nth-child(1) input {\n  position: absolute;\n  margin-right: 3px;\n}\n.w-e-text .w-e-todo li span:nth-child(1) input[type=checkbox] {\n  top: 50%;\n  margin-top: -6px;\n}\n.w-e-tooltip {\n  position: absolute;\n  display: flex;\n  color: #f1f1f1;\n  background-color: rgba(0, 0, 0, 0.75);\n  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  padding: 4px 5px 6px;\n  justify-content: center;\n  align-items: center;\n}\n.w-e-tooltip-up::after {\n  content: "";\n  position: absolute;\n  top: 100%;\n  left: 50%;\n  margin-left: -5px;\n  border: 5px solid rgba(0, 0, 0, 0);\n  border-top-color: rgba(0, 0, 0, 0.73);\n}\n.w-e-tooltip-down::after {\n  content: "";\n  position: absolute;\n  bottom: 100%;\n  left: 50%;\n  margin-left: -5px;\n  border: 5px solid rgba(0, 0, 0, 0);\n  border-bottom-color: rgba(0, 0, 0, 0.73);\n}\n.w-e-tooltip-item-wrapper {\n  cursor: pointer;\n  font-size: 14px;\n  margin: 0 5px;\n}\n.w-e-tooltip-item-wrapper:hover {\n  color: #ccc;\n  text-decoration: underline;\n}\n', ""]);
        module2.exports = exports2;
      },
      function(module2, exports2, __webpack_require__) {
        var api = __webpack_require__(20);
        var content = __webpack_require__(157);
        content = content.__esModule ? content.default : content;
        if (typeof content === "string") {
          content = [[module2.i, content, ""]];
        }
        var options = {};
        options.insert = "head";
        options.singleton = false;
        api(content, options);
        module2.exports = content.locals || {};
      },
      function(module2, exports2, __webpack_require__) {
        var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(21);
        exports2 = ___CSS_LOADER_API_IMPORT___(false);
        exports2.push([module2.i, '.w-e-menu .w-e-panel-container {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  border: 1px solid #ccc;\n  border-top: 0;\n  box-shadow: 1px 1px 2px #ccc;\n  color: #333;\n  background-color: #fff;\n  text-align: left;\n  /* \u4E3A emotion panel \u5B9A\u5236\u7684\u6837\u5F0F */\n  /* \u4E0A\u4F20\u56FE\u7247\u3001\u4E0A\u4F20\u89C6\u9891\u7684 panel \u5B9A\u5236\u6837\u5F0F */\n}\n.w-e-menu .w-e-panel-container .w-e-panel-close {\n  position: absolute;\n  right: 0;\n  top: 0;\n  padding: 5px;\n  margin: 2px 5px 0 0;\n  cursor: pointer;\n  color: #999;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-close:hover {\n  color: #333;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-title {\n  list-style: none;\n  display: flex;\n  font-size: 14px;\n  margin: 2px 10px 0 10px;\n  border-bottom: 1px solid #f1f1f1;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-title .w-e-item {\n  padding: 3px 5px;\n  color: #999;\n  cursor: pointer;\n  margin: 0 3px;\n  position: relative;\n  top: 1px;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-title .w-e-active {\n  color: #333;\n  border-bottom: 1px solid #333;\n  cursor: default;\n  font-weight: 700;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content {\n  padding: 10px 15px 10px 15px;\n  font-size: 16px;\n  /* \u8F93\u5165\u6846\u7684\u6837\u5F0F */\n  /* \u6309\u94AE\u7684\u6837\u5F0F */\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content input:focus,\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content textarea:focus,\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content button:focus {\n  outline: none;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content textarea {\n  width: 100%;\n  border: 1px solid #ccc;\n  padding: 5px;\n  margin-top: 10px;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content textarea:focus {\n  border-color: #1e88e5;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content input[type=text] {\n  border: none;\n  border-bottom: 1px solid #ccc;\n  font-size: 14px;\n  height: 20px;\n  color: #333;\n  text-align: left;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content input[type=text].small {\n  width: 30px;\n  text-align: center;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content input[type=text].block {\n  display: block;\n  width: 100%;\n  margin: 10px 0;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content input[type=text]:focus {\n  border-bottom: 2px solid #1e88e5;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button {\n  font-size: 14px;\n  color: #1e88e5;\n  border: none;\n  padding: 5px 10px;\n  background-color: #fff;\n  cursor: pointer;\n  border-radius: 3px;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.left {\n  float: left;\n  margin-right: 10px;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.right {\n  float: right;\n  margin-left: 10px;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.gray {\n  color: #999;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button.red {\n  color: #c24f4a;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content .w-e-button-container button:hover {\n  background-color: #f1f1f1;\n}\n.w-e-menu .w-e-panel-container .w-e-panel-tab-content .w-e-button-container:after {\n  content: "";\n  display: table;\n  clear: both;\n}\n.w-e-menu .w-e-panel-container .w-e-emoticon-container .w-e-item {\n  cursor: pointer;\n  font-size: 18px;\n  padding: 0 3px;\n  display: inline-block;\n}\n.w-e-menu .w-e-panel-container .w-e-up-img-container,\n.w-e-menu .w-e-panel-container .w-e-up-video-container {\n  text-align: center;\n}\n.w-e-menu .w-e-panel-container .w-e-up-img-container .w-e-up-btn,\n.w-e-menu .w-e-panel-container .w-e-up-video-container .w-e-up-btn {\n  display: inline-block;\n  color: #999;\n  cursor: pointer;\n  font-size: 60px;\n  line-height: 1;\n}\n.w-e-menu .w-e-panel-container .w-e-up-img-container .w-e-up-btn:hover,\n.w-e-menu .w-e-panel-container .w-e-up-video-container .w-e-up-btn:hover {\n  color: #333;\n}\n', ""]);
        module2.exports = exports2;
      },
      function(module2, exports2, __webpack_require__) {
        var api = __webpack_require__(20);
        var content = __webpack_require__(159);
        content = content.__esModule ? content.default : content;
        if (typeof content === "string") {
          content = [[module2.i, content, ""]];
        }
        var options = {};
        options.insert = "head";
        options.singleton = false;
        api(content, options);
        module2.exports = content.locals || {};
      },
      function(module2, exports2, __webpack_require__) {
        var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(21);
        exports2 = ___CSS_LOADER_API_IMPORT___(false);
        exports2.push([module2.i, ".w-e-toolbar .w-e-droplist {\n  position: absolute;\n  left: 0;\n  top: 0;\n  background-color: #fff;\n  border: 1px solid #f1f1f1;\n  border-right-color: #ccc;\n  border-bottom-color: #ccc;\n}\n.w-e-toolbar .w-e-droplist .w-e-dp-title {\n  text-align: center;\n  color: #999;\n  line-height: 2;\n  border-bottom: 1px solid #f1f1f1;\n  font-size: 13px;\n}\n.w-e-toolbar .w-e-droplist ul.w-e-list {\n  list-style: none;\n  line-height: 1;\n}\n.w-e-toolbar .w-e-droplist ul.w-e-list li.w-e-item {\n  color: #333;\n  padding: 5px 0;\n}\n.w-e-toolbar .w-e-droplist ul.w-e-list li.w-e-item:hover {\n  background-color: #f1f1f1;\n}\n.w-e-toolbar .w-e-droplist ul.w-e-block {\n  list-style: none;\n  text-align: left;\n  padding: 5px;\n}\n.w-e-toolbar .w-e-droplist ul.w-e-block li.w-e-item {\n  display: inline-block;\n  padding: 3px 5px;\n}\n.w-e-toolbar .w-e-droplist ul.w-e-block li.w-e-item:hover {\n  background-color: #f1f1f1;\n}\n", ""]);
        module2.exports = exports2;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _promise = _interopRequireDefault(__webpack_require__(161));
        if (!Element.prototype.matches) {
          Element.prototype.matches = function(s) {
            var matches = this.ownerDocument.querySelectorAll(s);
            var i = matches.length;
            for (i; i >= 0; i--) {
              if (matches.item(i) === this)
                break;
            }
            return i > -1;
          };
        }
        if (!_promise["default"]) {
          window.Promise = _promise["default"];
        }
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(162);
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(163);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(61);
        __webpack_require__(50);
        __webpack_require__(54);
        __webpack_require__(175);
        __webpack_require__(178);
        __webpack_require__(179);
        var path = __webpack_require__(9);
        module2.exports = path.Promise;
      },
      function(module2, exports2, __webpack_require__) {
        var toInteger = __webpack_require__(62);
        var requireObjectCoercible = __webpack_require__(49);
        var createMethod = function(CONVERT_TO_STRING) {
          return function($this, pos) {
            var S = String(requireObjectCoercible($this));
            var position = toInteger(pos);
            var size = S.length;
            var first, second;
            if (position < 0 || position >= size)
              return CONVERT_TO_STRING ? "" : void 0;
            first = S.charCodeAt(position);
            return first < 55296 || first > 56319 || position + 1 === size || (second = S.charCodeAt(position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
          };
        };
        module2.exports = {
          codeAt: createMethod(false),
          charAt: createMethod(true)
        };
      },
      function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__(8);
        var inspectSource = __webpack_require__(102);
        var WeakMap2 = global2.WeakMap;
        module2.exports = typeof WeakMap2 === "function" && /native code/.test(inspectSource(WeakMap2));
      },
      function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__(8);
        var createNonEnumerableProperty = __webpack_require__(19);
        module2.exports = function(key, value) {
          try {
            createNonEnumerableProperty(global2, key, value);
          } catch (error) {
            global2[key] = value;
          }
          return value;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var IteratorPrototype = __webpack_require__(104).IteratorPrototype;
        var create = __webpack_require__(77);
        var createPropertyDescriptor = __webpack_require__(48);
        var setToStringTag = __webpack_require__(37);
        var Iterators = __webpack_require__(44);
        var returnThis = function() {
          return this;
        };
        module2.exports = function(IteratorConstructor, NAME, next) {
          var TO_STRING_TAG = NAME + " Iterator";
          IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
          setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
          Iterators[TO_STRING_TAG] = returnThis;
          return IteratorConstructor;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var fails = __webpack_require__(11);
        module2.exports = !fails(function() {
          function F() {
          }
          F.prototype.constructor = null;
          return Object.getPrototypeOf(new F()) !== F.prototype;
        });
      },
      function(module2, exports2, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__(14);
        var definePropertyModule = __webpack_require__(18);
        var anObject = __webpack_require__(25);
        var objectKeys = __webpack_require__(52);
        module2.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
          anObject(O);
          var keys2 = objectKeys(Properties);
          var length = keys2.length;
          var index2 = 0;
          var key;
          while (length > index2)
            definePropertyModule.f(O, key = keys2[index2++], Properties[key]);
          return O;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var TO_STRING_TAG_SUPPORT = __webpack_require__(81);
        var classof = __webpack_require__(65);
        module2.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
          return "[object " + classof(this) + "]";
        };
      },
      function(module2, exports2, __webpack_require__) {
        var anObject = __webpack_require__(25);
        var aPossiblePrototype = __webpack_require__(172);
        module2.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
          var CORRECT_SETTER = false;
          var test = {};
          var setter;
          try {
            setter = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set;
            setter.call(test, []);
            CORRECT_SETTER = test instanceof Array;
          } catch (error) {
          }
          return function setPrototypeOf(O, proto) {
            anObject(O);
            aPossiblePrototype(proto);
            if (CORRECT_SETTER)
              setter.call(O, proto);
            else
              O.__proto__ = proto;
            return O;
          };
        }() : void 0);
      },
      function(module2, exports2, __webpack_require__) {
        var isObject2 = __webpack_require__(13);
        module2.exports = function(it) {
          if (!isObject2(it) && it !== null) {
            throw TypeError("Can't set " + String(it) + " as a prototype");
          }
          return it;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var toIndexedObject = __webpack_require__(30);
        var addToUnscopables = __webpack_require__(82);
        var Iterators = __webpack_require__(44);
        var InternalStateModule = __webpack_require__(42);
        var defineIterator = __webpack_require__(75);
        var ARRAY_ITERATOR = "Array Iterator";
        var setInternalState = InternalStateModule.set;
        var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);
        module2.exports = defineIterator(Array, "Array", function(iterated, kind) {
          setInternalState(this, {
            type: ARRAY_ITERATOR,
            target: toIndexedObject(iterated),
            index: 0,
            kind
          });
        }, function() {
          var state = getInternalState(this);
          var target = state.target;
          var kind = state.kind;
          var index2 = state.index++;
          if (!target || index2 >= target.length) {
            state.target = void 0;
            return { value: void 0, done: true };
          }
          if (kind == "keys")
            return { value: index2, done: false };
          if (kind == "values")
            return { value: target[index2], done: false };
          return { value: [index2, target[index2]], done: false };
        }, "values");
        Iterators.Arguments = Iterators.Array;
        addToUnscopables("keys");
        addToUnscopables("values");
        addToUnscopables("entries");
      },
      function(module2, exports2) {
        module2.exports = {
          CSSRuleList: 0,
          CSSStyleDeclaration: 0,
          CSSValueList: 0,
          ClientRectList: 0,
          DOMRectList: 0,
          DOMStringList: 0,
          DOMTokenList: 1,
          DataTransferItemList: 0,
          FileList: 0,
          HTMLAllCollection: 0,
          HTMLCollection: 0,
          HTMLFormElement: 0,
          HTMLSelectElement: 0,
          MediaList: 0,
          MimeTypeArray: 0,
          NamedNodeMap: 0,
          NodeList: 1,
          PaintRequestList: 0,
          Plugin: 0,
          PluginArray: 0,
          SVGLengthList: 0,
          SVGNumberList: 0,
          SVGPathSegList: 0,
          SVGPointList: 0,
          SVGStringList: 0,
          SVGTransformList: 0,
          SourceBufferList: 0,
          StyleSheetList: 0,
          TextTrackCueList: 0,
          TextTrackList: 0,
          TouchList: 0
        };
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var IS_PURE = __webpack_require__(43);
        var global2 = __webpack_require__(8);
        var getBuiltIn = __webpack_require__(36);
        var NativePromise = __webpack_require__(109);
        var redefine = __webpack_require__(53);
        var redefineAll = __webpack_require__(110);
        var setToStringTag = __webpack_require__(37);
        var setSpecies = __webpack_require__(111);
        var isObject2 = __webpack_require__(13);
        var aFunction = __webpack_require__(41);
        var anInstance = __webpack_require__(83);
        var classof = __webpack_require__(34);
        var inspectSource = __webpack_require__(102);
        var iterate = __webpack_require__(66);
        var checkCorrectnessOfIteration = __webpack_require__(115);
        var speciesConstructor = __webpack_require__(116);
        var task = __webpack_require__(117).set;
        var microtask = __webpack_require__(176);
        var promiseResolve = __webpack_require__(119);
        var hostReportErrors = __webpack_require__(177);
        var newPromiseCapabilityModule = __webpack_require__(85);
        var perform = __webpack_require__(120);
        var InternalStateModule = __webpack_require__(42);
        var isForced = __webpack_require__(101);
        var wellKnownSymbol = __webpack_require__(10);
        var V8_VERSION = __webpack_require__(86);
        var SPECIES = wellKnownSymbol("species");
        var PROMISE = "Promise";
        var getInternalState = InternalStateModule.get;
        var setInternalState = InternalStateModule.set;
        var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
        var PromiseConstructor = NativePromise;
        var TypeError2 = global2.TypeError;
        var document2 = global2.document;
        var process = global2.process;
        var $fetch = getBuiltIn("fetch");
        var newPromiseCapability = newPromiseCapabilityModule.f;
        var newGenericPromiseCapability = newPromiseCapability;
        var IS_NODE = classof(process) == "process";
        var DISPATCH_EVENT = !!(document2 && document2.createEvent && global2.dispatchEvent);
        var UNHANDLED_REJECTION = "unhandledrejection";
        var REJECTION_HANDLED = "rejectionhandled";
        var PENDING = 0;
        var FULFILLED = 1;
        var REJECTED = 2;
        var HANDLED = 1;
        var UNHANDLED = 2;
        var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
        var FORCED = isForced(PROMISE, function() {
          var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
          if (!GLOBAL_CORE_JS_PROMISE) {
            if (V8_VERSION === 66)
              return true;
            if (!IS_NODE && typeof PromiseRejectionEvent != "function")
              return true;
          }
          if (IS_PURE && !PromiseConstructor.prototype["finally"])
            return true;
          if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor))
            return false;
          var promise = PromiseConstructor.resolve(1);
          var FakePromise = function(exec) {
            exec(function() {
            }, function() {
            });
          };
          var constructor = promise.constructor = {};
          constructor[SPECIES] = FakePromise;
          return !(promise.then(function() {
          }) instanceof FakePromise);
        });
        var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function(iterable) {
          PromiseConstructor.all(iterable)["catch"](function() {
          });
        });
        var isThenable = function(it) {
          var then;
          return isObject2(it) && typeof (then = it.then) == "function" ? then : false;
        };
        var notify = function(promise, state, isReject) {
          if (state.notified)
            return;
          state.notified = true;
          var chain = state.reactions;
          microtask(function() {
            var value = state.value;
            var ok = state.state == FULFILLED;
            var index2 = 0;
            while (chain.length > index2) {
              var reaction = chain[index2++];
              var handler = ok ? reaction.ok : reaction.fail;
              var resolve = reaction.resolve;
              var reject = reaction.reject;
              var domain = reaction.domain;
              var result, then, exited;
              try {
                if (handler) {
                  if (!ok) {
                    if (state.rejection === UNHANDLED)
                      onHandleUnhandled(promise, state);
                    state.rejection = HANDLED;
                  }
                  if (handler === true)
                    result = value;
                  else {
                    if (domain)
                      domain.enter();
                    result = handler(value);
                    if (domain) {
                      domain.exit();
                      exited = true;
                    }
                  }
                  if (result === reaction.promise) {
                    reject(TypeError2("Promise-chain cycle"));
                  } else if (then = isThenable(result)) {
                    then.call(result, resolve, reject);
                  } else
                    resolve(result);
                } else
                  reject(value);
              } catch (error) {
                if (domain && !exited)
                  domain.exit();
                reject(error);
              }
            }
            state.reactions = [];
            state.notified = false;
            if (isReject && !state.rejection)
              onUnhandled(promise, state);
          });
        };
        var dispatchEvent = function(name, promise, reason) {
          var event, handler;
          if (DISPATCH_EVENT) {
            event = document2.createEvent("Event");
            event.promise = promise;
            event.reason = reason;
            event.initEvent(name, false, true);
            global2.dispatchEvent(event);
          } else
            event = { promise, reason };
          if (handler = global2["on" + name])
            handler(event);
          else if (name === UNHANDLED_REJECTION)
            hostReportErrors("Unhandled promise rejection", reason);
        };
        var onUnhandled = function(promise, state) {
          task.call(global2, function() {
            var value = state.value;
            var IS_UNHANDLED = isUnhandled(state);
            var result;
            if (IS_UNHANDLED) {
              result = perform(function() {
                if (IS_NODE) {
                  process.emit("unhandledRejection", value, promise);
                } else
                  dispatchEvent(UNHANDLED_REJECTION, promise, value);
              });
              state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
              if (result.error)
                throw result.value;
            }
          });
        };
        var isUnhandled = function(state) {
          return state.rejection !== HANDLED && !state.parent;
        };
        var onHandleUnhandled = function(promise, state) {
          task.call(global2, function() {
            if (IS_NODE) {
              process.emit("rejectionHandled", promise);
            } else
              dispatchEvent(REJECTION_HANDLED, promise, state.value);
          });
        };
        var bind = function(fn, promise, state, unwrap) {
          return function(value) {
            fn(promise, state, value, unwrap);
          };
        };
        var internalReject = function(promise, state, value, unwrap) {
          if (state.done)
            return;
          state.done = true;
          if (unwrap)
            state = unwrap;
          state.value = value;
          state.state = REJECTED;
          notify(promise, state, true);
        };
        var internalResolve = function(promise, state, value, unwrap) {
          if (state.done)
            return;
          state.done = true;
          if (unwrap)
            state = unwrap;
          try {
            if (promise === value)
              throw TypeError2("Promise can't be resolved itself");
            var then = isThenable(value);
            if (then) {
              microtask(function() {
                var wrapper = { done: false };
                try {
                  then.call(value, bind(internalResolve, promise, wrapper, state), bind(internalReject, promise, wrapper, state));
                } catch (error) {
                  internalReject(promise, wrapper, error, state);
                }
              });
            } else {
              state.value = value;
              state.state = FULFILLED;
              notify(promise, state, false);
            }
          } catch (error) {
            internalReject(promise, { done: false }, error, state);
          }
        };
        if (FORCED) {
          PromiseConstructor = function Promise2(executor) {
            anInstance(this, PromiseConstructor, PROMISE);
            aFunction(executor);
            Internal.call(this);
            var state = getInternalState(this);
            try {
              executor(bind(internalResolve, this, state), bind(internalReject, this, state));
            } catch (error) {
              internalReject(this, state, error);
            }
          };
          Internal = function Promise2(executor) {
            setInternalState(this, {
              type: PROMISE,
              done: false,
              notified: false,
              parent: false,
              reactions: [],
              rejection: false,
              state: PENDING,
              value: void 0
            });
          };
          Internal.prototype = redefineAll(PromiseConstructor.prototype, {
            then: function then(onFulfilled, onRejected) {
              var state = getInternalPromiseState(this);
              var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
              reaction.ok = typeof onFulfilled == "function" ? onFulfilled : true;
              reaction.fail = typeof onRejected == "function" && onRejected;
              reaction.domain = IS_NODE ? process.domain : void 0;
              state.parent = true;
              state.reactions.push(reaction);
              if (state.state != PENDING)
                notify(this, state, false);
              return reaction.promise;
            },
            "catch": function(onRejected) {
              return this.then(void 0, onRejected);
            }
          });
          OwnPromiseCapability = function() {
            var promise = new Internal();
            var state = getInternalState(promise);
            this.promise = promise;
            this.resolve = bind(internalResolve, promise, state);
            this.reject = bind(internalReject, promise, state);
          };
          newPromiseCapabilityModule.f = newPromiseCapability = function(C) {
            return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
          };
          if (!IS_PURE && typeof NativePromise == "function") {
            nativeThen = NativePromise.prototype.then;
            redefine(NativePromise.prototype, "then", function then(onFulfilled, onRejected) {
              var that = this;
              return new PromiseConstructor(function(resolve, reject) {
                nativeThen.call(that, resolve, reject);
              }).then(onFulfilled, onRejected);
            }, { unsafe: true });
            if (typeof $fetch == "function")
              $({ global: true, enumerable: true, forced: true }, {
                fetch: function fetch(input) {
                  return promiseResolve(PromiseConstructor, $fetch.apply(global2, arguments));
                }
              });
          }
        }
        $({ global: true, wrap: true, forced: FORCED }, {
          Promise: PromiseConstructor
        });
        setToStringTag(PromiseConstructor, PROMISE, false, true);
        setSpecies(PROMISE);
        PromiseWrapper = getBuiltIn(PROMISE);
        $({ target: PROMISE, stat: true, forced: FORCED }, {
          reject: function reject(r) {
            var capability = newPromiseCapability(this);
            capability.reject.call(void 0, r);
            return capability.promise;
          }
        });
        $({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
          resolve: function resolve(x) {
            return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
          }
        });
        $({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
          all: function all(iterable) {
            var C = this;
            var capability = newPromiseCapability(C);
            var resolve = capability.resolve;
            var reject = capability.reject;
            var result = perform(function() {
              var $promiseResolve = aFunction(C.resolve);
              var values = [];
              var counter = 0;
              var remaining = 1;
              iterate(iterable, function(promise) {
                var index2 = counter++;
                var alreadyCalled = false;
                values.push(void 0);
                remaining++;
                $promiseResolve.call(C, promise).then(function(value) {
                  if (alreadyCalled)
                    return;
                  alreadyCalled = true;
                  values[index2] = value;
                  --remaining || resolve(values);
                }, reject);
              });
              --remaining || resolve(values);
            });
            if (result.error)
              reject(result.value);
            return capability.promise;
          },
          race: function race(iterable) {
            var C = this;
            var capability = newPromiseCapability(C);
            var reject = capability.reject;
            var result = perform(function() {
              var $promiseResolve = aFunction(C.resolve);
              iterate(iterable, function(promise) {
                $promiseResolve.call(C, promise).then(capability.resolve, reject);
              });
            });
            if (result.error)
              reject(result.value);
            return capability.promise;
          }
        });
      },
      function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__(8);
        var getOwnPropertyDescriptor = __webpack_require__(71).f;
        var classof = __webpack_require__(34);
        var macrotask = __webpack_require__(117).set;
        var IS_IOS = __webpack_require__(118);
        var MutationObserver2 = global2.MutationObserver || global2.WebKitMutationObserver;
        var process = global2.process;
        var Promise2 = global2.Promise;
        var IS_NODE = classof(process) == "process";
        var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global2, "queueMicrotask");
        var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
        var flush, head, last, notify, toggle, node, promise, then;
        if (!queueMicrotask) {
          flush = function() {
            var parent, fn;
            if (IS_NODE && (parent = process.domain))
              parent.exit();
            while (head) {
              fn = head.fn;
              head = head.next;
              try {
                fn();
              } catch (error) {
                if (head)
                  notify();
                else
                  last = void 0;
                throw error;
              }
            }
            last = void 0;
            if (parent)
              parent.enter();
          };
          if (IS_NODE) {
            notify = function() {
              process.nextTick(flush);
            };
          } else if (MutationObserver2 && !IS_IOS) {
            toggle = true;
            node = document.createTextNode("");
            new MutationObserver2(flush).observe(node, { characterData: true });
            notify = function() {
              node.data = toggle = !toggle;
            };
          } else if (Promise2 && Promise2.resolve) {
            promise = Promise2.resolve(void 0);
            then = promise.then;
            notify = function() {
              then.call(promise, flush);
            };
          } else {
            notify = function() {
              macrotask.call(global2, flush);
            };
          }
        }
        module2.exports = queueMicrotask || function(fn) {
          var task = { fn, next: void 0 };
          if (last)
            last.next = task;
          if (!head) {
            head = task;
            notify();
          }
          last = task;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__(8);
        module2.exports = function(a, b) {
          var console2 = global2.console;
          if (console2 && console2.error) {
            arguments.length === 1 ? console2.error(a) : console2.error(a, b);
          }
        };
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var aFunction = __webpack_require__(41);
        var newPromiseCapabilityModule = __webpack_require__(85);
        var perform = __webpack_require__(120);
        var iterate = __webpack_require__(66);
        $({ target: "Promise", stat: true }, {
          allSettled: function allSettled(iterable) {
            var C = this;
            var capability = newPromiseCapabilityModule.f(C);
            var resolve = capability.resolve;
            var reject = capability.reject;
            var result = perform(function() {
              var promiseResolve = aFunction(C.resolve);
              var values = [];
              var counter = 0;
              var remaining = 1;
              iterate(iterable, function(promise) {
                var index2 = counter++;
                var alreadyCalled = false;
                values.push(void 0);
                remaining++;
                promiseResolve.call(C, promise).then(function(value) {
                  if (alreadyCalled)
                    return;
                  alreadyCalled = true;
                  values[index2] = { status: "fulfilled", value };
                  --remaining || resolve(values);
                }, function(e) {
                  if (alreadyCalled)
                    return;
                  alreadyCalled = true;
                  values[index2] = { status: "rejected", reason: e };
                  --remaining || resolve(values);
                });
              });
              --remaining || resolve(values);
            });
            if (result.error)
              reject(result.value);
            return capability.promise;
          }
        });
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var IS_PURE = __webpack_require__(43);
        var NativePromise = __webpack_require__(109);
        var fails = __webpack_require__(11);
        var getBuiltIn = __webpack_require__(36);
        var speciesConstructor = __webpack_require__(116);
        var promiseResolve = __webpack_require__(119);
        var redefine = __webpack_require__(53);
        var NON_GENERIC = !!NativePromise && fails(function() {
          NativePromise.prototype["finally"].call({ then: function() {
          } }, function() {
          });
        });
        $({ target: "Promise", proto: true, real: true, forced: NON_GENERIC }, {
          "finally": function(onFinally) {
            var C = speciesConstructor(this, getBuiltIn("Promise"));
            var isFunction2 = typeof onFinally == "function";
            return this.then(isFunction2 ? function(x) {
              return promiseResolve(C, onFinally()).then(function() {
                return x;
              });
            } : onFinally, isFunction2 ? function(e) {
              return promiseResolve(C, onFinally()).then(function() {
                throw e;
              });
            } : onFinally);
          }
        });
        if (!IS_PURE && typeof NativePromise == "function" && !NativePromise.prototype["finally"]) {
          redefine(NativePromise.prototype, "finally", getBuiltIn("Promise").prototype["finally"]);
        }
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(54);
        var forEach = __webpack_require__(181);
        var classof = __webpack_require__(65);
        var ArrayPrototype = Array.prototype;
        var DOMIterables = {
          DOMTokenList: true,
          NodeList: true
        };
        module2.exports = function(it) {
          var own = it.forEach;
          return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.forEach || DOMIterables.hasOwnProperty(classof(it)) ? forEach : own;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(182);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(183);
        var entryVirtual = __webpack_require__(15);
        module2.exports = entryVirtual("Array").forEach;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var forEach = __webpack_require__(184);
        $({ target: "Array", proto: true, forced: [].forEach != forEach }, {
          forEach
        });
      },
      function(module2, exports2, __webpack_require__) {
        var $forEach = __webpack_require__(32).forEach;
        var arrayMethodIsStrict = __webpack_require__(67);
        var arrayMethodUsesToLength = __webpack_require__(22);
        var STRICT_METHOD = arrayMethodIsStrict("forEach");
        var USES_TO_LENGTH = arrayMethodUsesToLength("forEach");
        module2.exports = !STRICT_METHOD || !USES_TO_LENGTH ? function forEach(callbackfn) {
          return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
        } : [].forEach;
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(186);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(187);
        var path = __webpack_require__(9);
        module2.exports = path.Array.isArray;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var isArray2 = __webpack_require__(55);
        $({ target: "Array", stat: true }, {
          isArray: isArray2
        });
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(189);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        var map = __webpack_require__(190);
        var ArrayPrototype = Array.prototype;
        module2.exports = function(it) {
          var own = it.map;
          return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.map ? map : own;
        };
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(191);
        var entryVirtual = __webpack_require__(15);
        module2.exports = entryVirtual("Array").map;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var $map = __webpack_require__(32).map;
        var arrayMethodHasSpeciesSupport = __webpack_require__(56);
        var arrayMethodUsesToLength = __webpack_require__(22);
        var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("map");
        var USES_TO_LENGTH = arrayMethodUsesToLength("map");
        $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
          map: function map(callbackfn) {
            return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(193);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        var trim = __webpack_require__(194);
        var StringPrototype = String.prototype;
        module2.exports = function(it) {
          var own = it.trim;
          return typeof it === "string" || it === StringPrototype || it instanceof String && own === StringPrototype.trim ? trim : own;
        };
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(195);
        var entryVirtual = __webpack_require__(15);
        module2.exports = entryVirtual("String").trim;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var $trim = __webpack_require__(90).trim;
        var forcedStringTrimMethod = __webpack_require__(196);
        $({ target: "String", proto: true, forced: forcedStringTrimMethod("trim") }, {
          trim: function trim() {
            return $trim(this);
          }
        });
      },
      function(module2, exports2, __webpack_require__) {
        var fails = __webpack_require__(11);
        var whitespaces = __webpack_require__(68);
        var non = "\u200B\x85\u180E";
        module2.exports = function(METHOD_NAME) {
          return fails(function() {
            return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
          });
        };
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(198);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(199);
        __webpack_require__(61);
        __webpack_require__(50);
        __webpack_require__(54);
        var path = __webpack_require__(9);
        module2.exports = path.Map;
      },
      function(module2, exports2, __webpack_require__) {
        var collection = __webpack_require__(122);
        var collectionStrong = __webpack_require__(124);
        module2.exports = collection("Map", function(init) {
          return function Map2() {
            return init(this, arguments.length ? arguments[0] : void 0);
          };
        }, collectionStrong);
      },
      function(module2, exports2, __webpack_require__) {
        var fails = __webpack_require__(11);
        module2.exports = !fails(function() {
          return Object.isExtensible(Object.preventExtensions({}));
        });
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(202);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        var indexOf = __webpack_require__(203);
        var ArrayPrototype = Array.prototype;
        module2.exports = function(it) {
          var own = it.indexOf;
          return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.indexOf ? indexOf : own;
        };
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(204);
        var entryVirtual = __webpack_require__(15);
        module2.exports = entryVirtual("Array").indexOf;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var $indexOf = __webpack_require__(78).indexOf;
        var arrayMethodIsStrict = __webpack_require__(67);
        var arrayMethodUsesToLength = __webpack_require__(22);
        var nativeIndexOf = [].indexOf;
        var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
        var STRICT_METHOD = arrayMethodIsStrict("indexOf");
        var USES_TO_LENGTH = arrayMethodUsesToLength("indexOf", { ACCESSORS: true, 1: 0 });
        $({ target: "Array", proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
          indexOf: function indexOf(searchElement) {
            return NEGATIVE_ZERO ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(206);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        var splice2 = __webpack_require__(207);
        var ArrayPrototype = Array.prototype;
        module2.exports = function(it) {
          var own = it.splice;
          return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.splice ? splice2 : own;
        };
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(208);
        var entryVirtual = __webpack_require__(15);
        module2.exports = entryVirtual("Array").splice;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var toAbsoluteIndex = __webpack_require__(79);
        var toInteger = __webpack_require__(62);
        var toLength = __webpack_require__(35);
        var toObject = __webpack_require__(31);
        var arraySpeciesCreate = __webpack_require__(88);
        var createProperty = __webpack_require__(69);
        var arrayMethodHasSpeciesSupport = __webpack_require__(56);
        var arrayMethodUsesToLength = __webpack_require__(22);
        var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("splice");
        var USES_TO_LENGTH = arrayMethodUsesToLength("splice", { ACCESSORS: true, 0: 0, 1: 2 });
        var max = Math.max;
        var min = Math.min;
        var MAX_SAFE_INTEGER2 = 9007199254740991;
        var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = "Maximum allowed length exceeded";
        $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
          splice: function splice2(start, deleteCount) {
            var O = toObject(this);
            var len = toLength(O.length);
            var actualStart = toAbsoluteIndex(start, len);
            var argumentsLength = arguments.length;
            var insertCount, actualDeleteCount, A, k, from, to;
            if (argumentsLength === 0) {
              insertCount = actualDeleteCount = 0;
            } else if (argumentsLength === 1) {
              insertCount = 0;
              actualDeleteCount = len - actualStart;
            } else {
              insertCount = argumentsLength - 2;
              actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
            }
            if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER2) {
              throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
            }
            A = arraySpeciesCreate(O, actualDeleteCount);
            for (k = 0; k < actualDeleteCount; k++) {
              from = actualStart + k;
              if (from in O)
                createProperty(A, k, O[from]);
            }
            A.length = actualDeleteCount;
            if (insertCount < actualDeleteCount) {
              for (k = actualStart; k < len - actualDeleteCount; k++) {
                from = k + actualDeleteCount;
                to = k + insertCount;
                if (from in O)
                  O[to] = O[from];
                else
                  delete O[to];
              }
              for (k = len; k > len - actualDeleteCount + insertCount; k--)
                delete O[k - 1];
            } else if (insertCount > actualDeleteCount) {
              for (k = len - actualDeleteCount; k > actualStart; k--) {
                from = k + actualDeleteCount - 1;
                to = k + insertCount - 1;
                if (from in O)
                  O[to] = O[from];
                else
                  delete O[to];
              }
            }
            for (k = 0; k < insertCount; k++) {
              O[k + actualStart] = arguments[k + 2];
            }
            O.length = len - actualDeleteCount + insertCount;
            return A;
          }
        });
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(210);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        var filter = __webpack_require__(211);
        var ArrayPrototype = Array.prototype;
        module2.exports = function(it) {
          var own = it.filter;
          return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.filter ? filter : own;
        };
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(212);
        var entryVirtual = __webpack_require__(15);
        module2.exports = entryVirtual("Array").filter;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var $filter = __webpack_require__(32).filter;
        var arrayMethodHasSpeciesSupport = __webpack_require__(56);
        var arrayMethodUsesToLength = __webpack_require__(22);
        var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("filter");
        var USES_TO_LENGTH = arrayMethodUsesToLength("filter");
        $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
          filter: function filter(callbackfn) {
            return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(214);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        var arrayIncludes = __webpack_require__(215);
        var stringIncludes = __webpack_require__(217);
        var ArrayPrototype = Array.prototype;
        var StringPrototype = String.prototype;
        module2.exports = function(it) {
          var own = it.includes;
          if (it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.includes)
            return arrayIncludes;
          if (typeof it === "string" || it === StringPrototype || it instanceof String && own === StringPrototype.includes) {
            return stringIncludes;
          }
          return own;
        };
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(216);
        var entryVirtual = __webpack_require__(15);
        module2.exports = entryVirtual("Array").includes;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var $includes = __webpack_require__(78).includes;
        var addToUnscopables = __webpack_require__(82);
        var arrayMethodUsesToLength = __webpack_require__(22);
        var USES_TO_LENGTH = arrayMethodUsesToLength("indexOf", { ACCESSORS: true, 1: 0 });
        $({ target: "Array", proto: true, forced: !USES_TO_LENGTH }, {
          includes: function includes(el) {
            return $includes(this, el, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
        addToUnscopables("includes");
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(218);
        var entryVirtual = __webpack_require__(15);
        module2.exports = entryVirtual("String").includes;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var notARegExp = __webpack_require__(219);
        var requireObjectCoercible = __webpack_require__(49);
        var correctIsRegExpLogic = __webpack_require__(221);
        $({ target: "String", proto: true, forced: !correctIsRegExpLogic("includes") }, {
          includes: function includes(searchString) {
            return !!~String(requireObjectCoercible(this)).indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      function(module2, exports2, __webpack_require__) {
        var isRegExp = __webpack_require__(220);
        module2.exports = function(it) {
          if (isRegExp(it)) {
            throw TypeError("The method doesn't accept regular expressions");
          }
          return it;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var isObject2 = __webpack_require__(13);
        var classof = __webpack_require__(34);
        var wellKnownSymbol = __webpack_require__(10);
        var MATCH = wellKnownSymbol("match");
        module2.exports = function(it) {
          var isRegExp;
          return isObject2(it) && ((isRegExp = it[MATCH]) !== void 0 ? !!isRegExp : classof(it) == "RegExp");
        };
      },
      function(module2, exports2, __webpack_require__) {
        var wellKnownSymbol = __webpack_require__(10);
        var MATCH = wellKnownSymbol("match");
        module2.exports = function(METHOD_NAME) {
          var regexp = /./;
          try {
            "/./"[METHOD_NAME](regexp);
          } catch (e) {
            try {
              regexp[MATCH] = false;
              return "/./"[METHOD_NAME](regexp);
            } catch (f) {
            }
          }
          return false;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(223);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        var bind = __webpack_require__(224);
        var FunctionPrototype = Function.prototype;
        module2.exports = function(it) {
          var own = it.bind;
          return it === FunctionPrototype || it instanceof Function && own === FunctionPrototype.bind ? bind : own;
        };
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(225);
        var entryVirtual = __webpack_require__(15);
        module2.exports = entryVirtual("Function").bind;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var bind = __webpack_require__(226);
        $({ target: "Function", proto: true }, {
          bind
        });
      },
      function(module2, exports2, __webpack_require__) {
        var aFunction = __webpack_require__(41);
        var isObject2 = __webpack_require__(13);
        var slice = [].slice;
        var factories = {};
        var construct = function(C, argsLength, args) {
          if (!(argsLength in factories)) {
            for (var list = [], i = 0; i < argsLength; i++)
              list[i] = "a[" + i + "]";
            factories[argsLength] = Function("C,a", "return new C(" + list.join(",") + ")");
          }
          return factories[argsLength](C, args);
        };
        module2.exports = Function.bind || function bind(that) {
          var fn = aFunction(this);
          var partArgs = slice.call(arguments, 1);
          var boundFunction = function bound() {
            var args = partArgs.concat(slice.call(arguments));
            return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
          };
          if (isObject2(fn.prototype))
            boundFunction.prototype = fn.prototype;
          return boundFunction;
        };
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(228);
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(229);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(125);
        __webpack_require__(50);
        __webpack_require__(54);
        var WrappedWellKnownSymbolModule = __webpack_require__(93);
        module2.exports = WrappedWellKnownSymbolModule.f("iterator");
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(231);
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(232);
        __webpack_require__(251);
        __webpack_require__(252);
        __webpack_require__(253);
        __webpack_require__(254);
        __webpack_require__(255);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(233);
        __webpack_require__(61);
        __webpack_require__(234);
        __webpack_require__(236);
        __webpack_require__(237);
        __webpack_require__(238);
        __webpack_require__(239);
        __webpack_require__(125);
        __webpack_require__(240);
        __webpack_require__(241);
        __webpack_require__(242);
        __webpack_require__(243);
        __webpack_require__(244);
        __webpack_require__(245);
        __webpack_require__(246);
        __webpack_require__(247);
        __webpack_require__(248);
        __webpack_require__(249);
        __webpack_require__(250);
        var path = __webpack_require__(9);
        module2.exports = path.Symbol;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var fails = __webpack_require__(11);
        var isArray2 = __webpack_require__(55);
        var isObject2 = __webpack_require__(13);
        var toObject = __webpack_require__(31);
        var toLength = __webpack_require__(35);
        var createProperty = __webpack_require__(69);
        var arraySpeciesCreate = __webpack_require__(88);
        var arrayMethodHasSpeciesSupport = __webpack_require__(56);
        var wellKnownSymbol = __webpack_require__(10);
        var V8_VERSION = __webpack_require__(86);
        var IS_CONCAT_SPREADABLE = wellKnownSymbol("isConcatSpreadable");
        var MAX_SAFE_INTEGER2 = 9007199254740991;
        var MAXIMUM_ALLOWED_INDEX_EXCEEDED = "Maximum allowed index exceeded";
        var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function() {
          var array = [];
          array[IS_CONCAT_SPREADABLE] = false;
          return array.concat()[0] !== array;
        });
        var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("concat");
        var isConcatSpreadable = function(O) {
          if (!isObject2(O))
            return false;
          var spreadable = O[IS_CONCAT_SPREADABLE];
          return spreadable !== void 0 ? !!spreadable : isArray2(O);
        };
        var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;
        $({ target: "Array", proto: true, forced: FORCED }, {
          concat: function concat(arg) {
            var O = toObject(this);
            var A = arraySpeciesCreate(O, 0);
            var n = 0;
            var i, k, length, len, E2;
            for (i = -1, length = arguments.length; i < length; i++) {
              E2 = i === -1 ? O : arguments[i];
              if (isConcatSpreadable(E2)) {
                len = toLength(E2.length);
                if (n + len > MAX_SAFE_INTEGER2)
                  throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
                for (k = 0; k < len; k++, n++)
                  if (k in E2)
                    createProperty(A, n, E2[k]);
              } else {
                if (n >= MAX_SAFE_INTEGER2)
                  throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
                createProperty(A, n++, E2);
              }
            }
            A.length = n;
            return A;
          }
        });
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var global2 = __webpack_require__(8);
        var getBuiltIn = __webpack_require__(36);
        var IS_PURE = __webpack_require__(43);
        var DESCRIPTORS = __webpack_require__(14);
        var NATIVE_SYMBOL = __webpack_require__(76);
        var USE_SYMBOL_AS_UID = __webpack_require__(106);
        var fails = __webpack_require__(11);
        var has = __webpack_require__(16);
        var isArray2 = __webpack_require__(55);
        var isObject2 = __webpack_require__(13);
        var anObject = __webpack_require__(25);
        var toObject = __webpack_require__(31);
        var toIndexedObject = __webpack_require__(30);
        var toPrimitive = __webpack_require__(60);
        var createPropertyDescriptor = __webpack_require__(48);
        var nativeObjectCreate = __webpack_require__(77);
        var objectKeys = __webpack_require__(52);
        var getOwnPropertyNamesModule = __webpack_require__(126);
        var getOwnPropertyNamesExternal = __webpack_require__(235);
        var getOwnPropertySymbolsModule = __webpack_require__(127);
        var getOwnPropertyDescriptorModule = __webpack_require__(71);
        var definePropertyModule = __webpack_require__(18);
        var propertyIsEnumerableModule = __webpack_require__(59);
        var createNonEnumerableProperty = __webpack_require__(19);
        var redefine = __webpack_require__(53);
        var shared = __webpack_require__(74);
        var sharedKey = __webpack_require__(63);
        var hiddenKeys = __webpack_require__(51);
        var uid = __webpack_require__(64);
        var wellKnownSymbol = __webpack_require__(10);
        var wrappedWellKnownSymbolModule = __webpack_require__(93);
        var defineWellKnownSymbol = __webpack_require__(12);
        var setToStringTag = __webpack_require__(37);
        var InternalStateModule = __webpack_require__(42);
        var $forEach = __webpack_require__(32).forEach;
        var HIDDEN = sharedKey("hidden");
        var SYMBOL = "Symbol";
        var PROTOTYPE = "prototype";
        var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
        var setInternalState = InternalStateModule.set;
        var getInternalState = InternalStateModule.getterFor(SYMBOL);
        var ObjectPrototype = Object[PROTOTYPE];
        var $Symbol = global2.Symbol;
        var $stringify = getBuiltIn("JSON", "stringify");
        var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
        var nativeDefineProperty = definePropertyModule.f;
        var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
        var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
        var AllSymbols = shared("symbols");
        var ObjectPrototypeSymbols = shared("op-symbols");
        var StringToSymbolRegistry = shared("string-to-symbol-registry");
        var SymbolToStringRegistry = shared("symbol-to-string-registry");
        var WellKnownSymbolsStore = shared("wks");
        var QObject = global2.QObject;
        var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
        var setSymbolDescriptor = DESCRIPTORS && fails(function() {
          return nativeObjectCreate(nativeDefineProperty({}, "a", {
            get: function() {
              return nativeDefineProperty(this, "a", { value: 7 }).a;
            }
          })).a != 7;
        }) ? function(O, P, Attributes) {
          var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
          if (ObjectPrototypeDescriptor)
            delete ObjectPrototype[P];
          nativeDefineProperty(O, P, Attributes);
          if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
            nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
          }
        } : nativeDefineProperty;
        var wrap = function(tag, description) {
          var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
          setInternalState(symbol, {
            type: SYMBOL,
            tag,
            description
          });
          if (!DESCRIPTORS)
            symbol.description = description;
          return symbol;
        };
        var isSymbol = USE_SYMBOL_AS_UID ? function(it) {
          return typeof it == "symbol";
        } : function(it) {
          return Object(it) instanceof $Symbol;
        };
        var $defineProperty = function defineProperty2(O, P, Attributes) {
          if (O === ObjectPrototype)
            $defineProperty(ObjectPrototypeSymbols, P, Attributes);
          anObject(O);
          var key = toPrimitive(P, true);
          anObject(Attributes);
          if (has(AllSymbols, key)) {
            if (!Attributes.enumerable) {
              if (!has(O, HIDDEN))
                nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
              O[HIDDEN][key] = true;
            } else {
              if (has(O, HIDDEN) && O[HIDDEN][key])
                O[HIDDEN][key] = false;
              Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
            }
            return setSymbolDescriptor(O, key, Attributes);
          }
          return nativeDefineProperty(O, key, Attributes);
        };
        var $defineProperties = function defineProperties(O, Properties) {
          anObject(O);
          var properties = toIndexedObject(Properties);
          var keys2 = objectKeys(properties).concat($getOwnPropertySymbols(properties));
          $forEach(keys2, function(key) {
            if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key))
              $defineProperty(O, key, properties[key]);
          });
          return O;
        };
        var $create = function create(O, Properties) {
          return Properties === void 0 ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
        };
        var $propertyIsEnumerable = function propertyIsEnumerable2(V) {
          var P = toPrimitive(V, true);
          var enumerable = nativePropertyIsEnumerable.call(this, P);
          if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P))
            return false;
          return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
        };
        var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
          var it = toIndexedObject(O);
          var key = toPrimitive(P, true);
          if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key))
            return;
          var descriptor = nativeGetOwnPropertyDescriptor(it, key);
          if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
            descriptor.enumerable = true;
          }
          return descriptor;
        };
        var $getOwnPropertyNames = function getOwnPropertyNames(O) {
          var names = nativeGetOwnPropertyNames(toIndexedObject(O));
          var result = [];
          $forEach(names, function(key) {
            if (!has(AllSymbols, key) && !has(hiddenKeys, key))
              result.push(key);
          });
          return result;
        };
        var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
          var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
          var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
          var result = [];
          $forEach(names, function(key) {
            if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
              result.push(AllSymbols[key]);
            }
          });
          return result;
        };
        if (!NATIVE_SYMBOL) {
          $Symbol = function Symbol2() {
            if (this instanceof $Symbol)
              throw TypeError("Symbol is not a constructor");
            var description = !arguments.length || arguments[0] === void 0 ? void 0 : String(arguments[0]);
            var tag = uid(description);
            var setter = function(value) {
              if (this === ObjectPrototype)
                setter.call(ObjectPrototypeSymbols, value);
              if (has(this, HIDDEN) && has(this[HIDDEN], tag))
                this[HIDDEN][tag] = false;
              setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
            };
            if (DESCRIPTORS && USE_SETTER)
              setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
            return wrap(tag, description);
          };
          redefine($Symbol[PROTOTYPE], "toString", function toString() {
            return getInternalState(this).tag;
          });
          redefine($Symbol, "withoutSetter", function(description) {
            return wrap(uid(description), description);
          });
          propertyIsEnumerableModule.f = $propertyIsEnumerable;
          definePropertyModule.f = $defineProperty;
          getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
          getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
          getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;
          wrappedWellKnownSymbolModule.f = function(name) {
            return wrap(wellKnownSymbol(name), name);
          };
          if (DESCRIPTORS) {
            nativeDefineProperty($Symbol[PROTOTYPE], "description", {
              configurable: true,
              get: function description() {
                return getInternalState(this).description;
              }
            });
            if (!IS_PURE) {
              redefine(ObjectPrototype, "propertyIsEnumerable", $propertyIsEnumerable, { unsafe: true });
            }
          }
        }
        $({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
          Symbol: $Symbol
        });
        $forEach(objectKeys(WellKnownSymbolsStore), function(name) {
          defineWellKnownSymbol(name);
        });
        $({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
          "for": function(key) {
            var string = String(key);
            if (has(StringToSymbolRegistry, string))
              return StringToSymbolRegistry[string];
            var symbol = $Symbol(string);
            StringToSymbolRegistry[string] = symbol;
            SymbolToStringRegistry[symbol] = string;
            return symbol;
          },
          keyFor: function keyFor(sym) {
            if (!isSymbol(sym))
              throw TypeError(sym + " is not a symbol");
            if (has(SymbolToStringRegistry, sym))
              return SymbolToStringRegistry[sym];
          },
          useSetter: function() {
            USE_SETTER = true;
          },
          useSimple: function() {
            USE_SETTER = false;
          }
        });
        $({ target: "Object", stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
          create: $create,
          defineProperty: $defineProperty,
          defineProperties: $defineProperties,
          getOwnPropertyDescriptor: $getOwnPropertyDescriptor
        });
        $({ target: "Object", stat: true, forced: !NATIVE_SYMBOL }, {
          getOwnPropertyNames: $getOwnPropertyNames,
          getOwnPropertySymbols: $getOwnPropertySymbols
        });
        $({ target: "Object", stat: true, forced: fails(function() {
          getOwnPropertySymbolsModule.f(1);
        }) }, {
          getOwnPropertySymbols: function getOwnPropertySymbols(it) {
            return getOwnPropertySymbolsModule.f(toObject(it));
          }
        });
        if ($stringify) {
          var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function() {
            var symbol = $Symbol();
            return $stringify([symbol]) != "[null]" || $stringify({ a: symbol }) != "{}" || $stringify(Object(symbol)) != "{}";
          });
          $({ target: "JSON", stat: true, forced: FORCED_JSON_STRINGIFY }, {
            stringify: function stringify(it, replacer, space) {
              var args = [it];
              var index2 = 1;
              var $replacer;
              while (arguments.length > index2)
                args.push(arguments[index2++]);
              $replacer = replacer;
              if (!isObject2(replacer) && it === void 0 || isSymbol(it))
                return;
              if (!isArray2(replacer))
                replacer = function(key, value) {
                  if (typeof $replacer == "function")
                    value = $replacer.call(this, key, value);
                  if (!isSymbol(value))
                    return value;
                };
              args[1] = replacer;
              return $stringify.apply(null, args);
            }
          });
        }
        if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
          createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
        }
        setToStringTag($Symbol, SYMBOL);
        hiddenKeys[HIDDEN] = true;
      },
      function(module2, exports2, __webpack_require__) {
        var toIndexedObject = __webpack_require__(30);
        var nativeGetOwnPropertyNames = __webpack_require__(126).f;
        var toString = {}.toString;
        var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
        var getWindowNames = function(it) {
          try {
            return nativeGetOwnPropertyNames(it);
          } catch (error) {
            return windowNames.slice();
          }
        };
        module2.exports.f = function getOwnPropertyNames(it) {
          return windowNames && toString.call(it) == "[object Window]" ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
        };
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("asyncIterator");
      },
      function(module2, exports2) {
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("hasInstance");
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("isConcatSpreadable");
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("match");
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("matchAll");
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("replace");
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("search");
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("species");
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("split");
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("toPrimitive");
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("toStringTag");
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("unscopables");
      },
      function(module2, exports2, __webpack_require__) {
        var setToStringTag = __webpack_require__(37);
        setToStringTag(Math, "Math", true);
      },
      function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__(8);
        var setToStringTag = __webpack_require__(37);
        setToStringTag(global2.JSON, "JSON", true);
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("asyncDispose");
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("dispose");
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("observable");
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("patternMatch");
      },
      function(module2, exports2, __webpack_require__) {
        var defineWellKnownSymbol = __webpack_require__(12);
        defineWellKnownSymbol("replaceAll");
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(257);
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(258);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(259);
        var path = __webpack_require__(9);
        module2.exports = path.parseInt;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var parseIntImplementation = __webpack_require__(260);
        $({ global: true, forced: parseInt != parseIntImplementation }, {
          parseInt: parseIntImplementation
        });
      },
      function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__(8);
        var trim = __webpack_require__(90).trim;
        var whitespaces = __webpack_require__(68);
        var $parseInt = global2.parseInt;
        var hex = /^[+-]?0[Xx]/;
        var FORCED = $parseInt(whitespaces + "08") !== 8 || $parseInt(whitespaces + "0x16") !== 22;
        module2.exports = FORCED ? function parseInt2(string, radix) {
          var S = trim(String(string));
          return $parseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10));
        } : $parseInt;
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(262);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        var slice = __webpack_require__(263);
        var ArrayPrototype = Array.prototype;
        module2.exports = function(it) {
          var own = it.slice;
          return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.slice ? slice : own;
        };
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(264);
        var entryVirtual = __webpack_require__(15);
        module2.exports = entryVirtual("Array").slice;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var isObject2 = __webpack_require__(13);
        var isArray2 = __webpack_require__(55);
        var toAbsoluteIndex = __webpack_require__(79);
        var toLength = __webpack_require__(35);
        var toIndexedObject = __webpack_require__(30);
        var createProperty = __webpack_require__(69);
        var wellKnownSymbol = __webpack_require__(10);
        var arrayMethodHasSpeciesSupport = __webpack_require__(56);
        var arrayMethodUsesToLength = __webpack_require__(22);
        var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("slice");
        var USES_TO_LENGTH = arrayMethodUsesToLength("slice", { ACCESSORS: true, 0: 0, 1: 2 });
        var SPECIES = wellKnownSymbol("species");
        var nativeSlice = [].slice;
        var max = Math.max;
        $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
          slice: function slice(start, end) {
            var O = toIndexedObject(this);
            var length = toLength(O.length);
            var k = toAbsoluteIndex(start, length);
            var fin = toAbsoluteIndex(end === void 0 ? length : end, length);
            var Constructor, result, n;
            if (isArray2(O)) {
              Constructor = O.constructor;
              if (typeof Constructor == "function" && (Constructor === Array || isArray2(Constructor.prototype))) {
                Constructor = void 0;
              } else if (isObject2(Constructor)) {
                Constructor = Constructor[SPECIES];
                if (Constructor === null)
                  Constructor = void 0;
              }
              if (Constructor === Array || Constructor === void 0) {
                return nativeSlice.call(O, k, fin);
              }
            }
            result = new (Constructor === void 0 ? Array : Constructor)(max(fin - k, 0));
            for (n = 0; k < fin; k++, n++)
              if (k in O)
                createProperty(result, n, O[k]);
            result.length = n;
            return result;
          }
        });
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(266);
        var path = __webpack_require__(9);
        module2.exports = path.setTimeout;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var global2 = __webpack_require__(8);
        var userAgent = __webpack_require__(84);
        var slice = [].slice;
        var MSIE = /MSIE .\./.test(userAgent);
        var wrap = function(scheduler) {
          return function(handler, timeout) {
            var boundArgs = arguments.length > 2;
            var args = boundArgs ? slice.call(arguments, 2) : void 0;
            return scheduler(boundArgs ? function() {
              (typeof handler == "function" ? handler : Function(handler)).apply(this, args);
            } : handler, timeout);
          };
        };
        $({ global: true, bind: true, forced: MSIE }, {
          setTimeout: wrap(global2.setTimeout),
          setInterval: wrap(global2.setInterval)
        });
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _assign = _interopRequireDefault(__webpack_require__(128));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var menus_1 = tslib_1.__importDefault(__webpack_require__(272));
        var events_1 = tslib_1.__importDefault(__webpack_require__(273));
        var style_1 = tslib_1.__importDefault(__webpack_require__(129));
        var paste_1 = tslib_1.__importDefault(__webpack_require__(274));
        var cmd_1 = tslib_1.__importDefault(__webpack_require__(275));
        var image_1 = tslib_1.__importDefault(__webpack_require__(276));
        var text_1 = tslib_1.__importDefault(__webpack_require__(130));
        var lang_1 = tslib_1.__importDefault(__webpack_require__(277));
        var history_1 = tslib_1.__importDefault(__webpack_require__(278));
        var video_1 = tslib_1.__importDefault(__webpack_require__(279));
        var defaultConfig = (0, _assign["default"])({}, menus_1["default"], events_1["default"], style_1["default"], cmd_1["default"], paste_1["default"], image_1["default"], text_1["default"], lang_1["default"], history_1["default"], video_1["default"], {
          linkCheck: function linkCheck(text, link) {
            return true;
          }
        });
        exports2["default"] = defaultConfig;
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(269);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(270);
        var path = __webpack_require__(9);
        module2.exports = path.Object.assign;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var assign = __webpack_require__(271);
        $({ target: "Object", stat: true, forced: Object.assign !== assign }, {
          assign
        });
      },
      function(module2, exports2, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__(14);
        var fails = __webpack_require__(11);
        var objectKeys = __webpack_require__(52);
        var getOwnPropertySymbolsModule = __webpack_require__(127);
        var propertyIsEnumerableModule = __webpack_require__(59);
        var toObject = __webpack_require__(31);
        var IndexedObject = __webpack_require__(72);
        var nativeAssign = Object.assign;
        var defineProperty2 = Object.defineProperty;
        module2.exports = !nativeAssign || fails(function() {
          if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty2({}, "a", {
            enumerable: true,
            get: function() {
              defineProperty2(this, "b", {
                value: 3,
                enumerable: false
              });
            }
          }), { b: 2 })).b !== 1)
            return true;
          var A = {};
          var B = {};
          var symbol = Symbol();
          var alphabet = "abcdefghijklmnopqrst";
          A[symbol] = 7;
          alphabet.split("").forEach(function(chr) {
            B[chr] = chr;
          });
          return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join("") != alphabet;
        }) ? function assign(target, source) {
          var T = toObject(target);
          var argumentsLength = arguments.length;
          var index2 = 1;
          var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
          var propertyIsEnumerable2 = propertyIsEnumerableModule.f;
          while (argumentsLength > index2) {
            var S = IndexedObject(arguments[index2++]);
            var keys2 = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
            var length = keys2.length;
            var j = 0;
            var key;
            while (length > j) {
              key = keys2[j++];
              if (!DESCRIPTORS || propertyIsEnumerable2.call(S, key))
                T[key] = S[key];
            }
          }
          return T;
        } : nativeAssign;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2["default"] = {
          menus: [
            "head",
            "bold",
            "fontSize",
            "fontName",
            "italic",
            "underline",
            "strikeThrough",
            "indent",
            "lineHeight",
            "foreColor",
            "backColor",
            "link",
            "list",
            "todo",
            "justify",
            "quote",
            "emoticon",
            "image",
            "video",
            "table",
            "code",
            "splitLine",
            "undo",
            "redo"
          ],
          fontNames: ["\u9ED1\u4F53", "\u4EFF\u5B8B", "\u6977\u4F53", "\u6807\u6977\u4F53", "\u534E\u6587\u4EFF\u5B8B", "\u534E\u6587\u6977\u4F53", "\u5B8B\u4F53", "\u5FAE\u8F6F\u96C5\u9ED1", "Arial", "Tahoma", "Verdana", "Times New Roman", "Courier New"],
          fontSizes: {
            "x-small": {
              name: "10px",
              value: "1"
            },
            small: {
              name: "13px",
              value: "2"
            },
            normal: {
              name: "16px",
              value: "3"
            },
            large: {
              name: "18px",
              value: "4"
            },
            "x-large": {
              name: "24px",
              value: "5"
            },
            "xx-large": {
              name: "32px",
              value: "6"
            },
            "xxx-large": {
              name: "48px",
              value: "7"
            }
          },
          colors: ["#000000", "#ffffff", "#eeece0", "#1c487f", "#4d80bf", "#c24f4a", "#8baa4a", "#7b5ba1", "#46acc8", "#f9963b"],
          languageType: ["Bash", "C", "C#", "C++", "CSS", "Java", "JavaScript", "JSON", "TypeScript", "Plain text", "Html", "XML", "SQL", "Go", "Kotlin", "Lua", "Markdown", "PHP", "Python", "Shell Session", "Ruby"],
          languageTab: "\u3000\u3000\u3000\u3000",
          emotions: [{
            title: "\u8868\u60C5",
            type: "emoji",
            content: "\u{1F600} \u{1F603} \u{1F604} \u{1F601} \u{1F606} \u{1F605} \u{1F602} \u{1F923} \u{1F60A} \u{1F607} \u{1F642} \u{1F643} \u{1F609} \u{1F60C} \u{1F60D} \u{1F618} \u{1F617} \u{1F619} \u{1F61A} \u{1F60B} \u{1F61B} \u{1F61D} \u{1F61C} \u{1F913} \u{1F60E} \u{1F60F} \u{1F612} \u{1F61E} \u{1F614} \u{1F61F} \u{1F615} \u{1F641} \u{1F623} \u{1F616} \u{1F62B} \u{1F629} \u{1F622} \u{1F62D} \u{1F624} \u{1F620} \u{1F621} \u{1F633} \u{1F631} \u{1F628} \u{1F917} \u{1F914} \u{1F636} \u{1F611} \u{1F62C} \u{1F644} \u{1F62F} \u{1F634} \u{1F637} \u{1F911} \u{1F608} \u{1F921} \u{1F4A9} \u{1F47B} \u{1F480} \u{1F440} \u{1F463}".split(/\s/)
          }, {
            title: "\u624B\u52BF",
            type: "emoji",
            content: "\u{1F450} \u{1F64C} \u{1F44F} \u{1F91D} \u{1F44D} \u{1F44E} \u{1F44A} \u270A \u{1F91B} \u{1F91C} \u{1F91E} \u270C\uFE0F \u{1F918} \u{1F44C} \u{1F448} \u{1F449} \u{1F446} \u{1F447} \u261D\uFE0F \u270B \u{1F91A} \u{1F590} \u{1F596} \u{1F44B} \u{1F919} \u{1F4AA} \u{1F595} \u270D\uFE0F \u{1F64F}".split(/\s/)
          }],
          lineHeights: ["1", "1.15", "1.6", "2", "2.5", "3"],
          undoLimit: 20,
          indentation: "2em",
          showMenuTooltips: true,
          menuTooltipPosition: "up"
        };
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var const_1 = __webpack_require__(7);
        function customAlert(alertInfo, alertType, debugInfo) {
          window.alert(alertInfo);
          if (debugInfo) {
            console.error("wangEditor: " + debugInfo);
          }
        }
        exports2["default"] = {
          onchangeTimeout: 200,
          onchange: null,
          onfocus: const_1.EMPTY_FN,
          onblur: const_1.EMPTY_FN,
          onCatalogChange: null,
          customAlert
        };
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2["default"] = {
          pasteFilterStyle: true,
          pasteIgnoreImg: false,
          pasteTextHandle: function pasteTextHandle(content) {
            return content;
          }
        };
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2["default"] = {
          styleWithCSS: false
        };
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var const_1 = __webpack_require__(7);
        exports2["default"] = {
          linkImgCheck: function linkImgCheck(src, alt, href) {
            return true;
          },
          showLinkImg: true,
          showLinkImgAlt: true,
          showLinkImgHref: true,
          linkImgCallback: const_1.EMPTY_FN,
          uploadImgAccept: ["jpg", "jpeg", "png", "gif", "bmp"],
          uploadImgServer: "",
          uploadImgShowBase64: false,
          uploadImgMaxSize: 5 * 1024 * 1024,
          uploadImgMaxLength: 100,
          uploadFileName: "",
          uploadImgParams: {},
          uploadImgParamsWithUrl: false,
          uploadImgHeaders: {},
          uploadImgHooks: {},
          uploadImgTimeout: 10 * 1e3,
          withCredentials: false,
          customUploadImg: null,
          uploadImgFromMedia: null
        };
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2["default"] = {
          lang: "zh-CN",
          languages: {
            "zh-CN": {
              wangEditor: {
                \u91CD\u7F6E: "\u91CD\u7F6E",
                \u63D2\u5165: "\u63D2\u5165",
                \u9ED8\u8BA4: "\u9ED8\u8BA4",
                \u521B\u5EFA: "\u521B\u5EFA",
                \u4FEE\u6539: "\u4FEE\u6539",
                \u5982: "\u5982",
                \u8BF7\u8F93\u5165\u6B63\u6587: "\u8BF7\u8F93\u5165\u6B63\u6587",
                menus: {
                  title: {
                    \u6807\u9898: "\u6807\u9898",
                    \u52A0\u7C97: "\u52A0\u7C97",
                    \u5B57\u53F7: "\u5B57\u53F7",
                    \u5B57\u4F53: "\u5B57\u4F53",
                    \u659C\u4F53: "\u659C\u4F53",
                    \u4E0B\u5212\u7EBF: "\u4E0B\u5212\u7EBF",
                    \u5220\u9664\u7EBF: "\u5220\u9664\u7EBF",
                    \u7F29\u8FDB: "\u7F29\u8FDB",
                    \u884C\u9AD8: "\u884C\u9AD8",
                    \u6587\u5B57\u989C\u8272: "\u6587\u5B57\u989C\u8272",
                    \u80CC\u666F\u8272: "\u80CC\u666F\u8272",
                    \u94FE\u63A5: "\u94FE\u63A5",
                    \u5E8F\u5217: "\u5E8F\u5217",
                    \u5BF9\u9F50: "\u5BF9\u9F50",
                    \u5F15\u7528: "\u5F15\u7528",
                    \u8868\u60C5: "\u8868\u60C5",
                    \u56FE\u7247: "\u56FE\u7247",
                    \u89C6\u9891: "\u89C6\u9891",
                    \u8868\u683C: "\u8868\u683C",
                    \u4EE3\u7801: "\u4EE3\u7801",
                    \u5206\u5272\u7EBF: "\u5206\u5272\u7EBF",
                    \u6062\u590D: "\u6062\u590D",
                    \u64A4\u9500: "\u64A4\u9500",
                    \u5168\u5C4F: "\u5168\u5C4F",
                    \u53D6\u6D88\u5168\u5C4F: "\u53D6\u6D88\u5168\u5C4F",
                    \u5F85\u529E\u4E8B\u9879: "\u5F85\u529E\u4E8B\u9879"
                  },
                  dropListMenu: {
                    \u8BBE\u7F6E\u6807\u9898: "\u8BBE\u7F6E\u6807\u9898",
                    \u80CC\u666F\u989C\u8272: "\u80CC\u666F\u989C\u8272",
                    \u6587\u5B57\u989C\u8272: "\u6587\u5B57\u989C\u8272",
                    \u8BBE\u7F6E\u5B57\u53F7: "\u8BBE\u7F6E\u5B57\u53F7",
                    \u8BBE\u7F6E\u5B57\u4F53: "\u8BBE\u7F6E\u5B57\u4F53",
                    \u8BBE\u7F6E\u7F29\u8FDB: "\u8BBE\u7F6E\u7F29\u8FDB",
                    \u5BF9\u9F50\u65B9\u5F0F: "\u5BF9\u9F50\u65B9\u5F0F",
                    \u8BBE\u7F6E\u884C\u9AD8: "\u8BBE\u7F6E\u884C\u9AD8",
                    \u5E8F\u5217: "\u5E8F\u5217",
                    head: {
                      \u6B63\u6587: "\u6B63\u6587"
                    },
                    indent: {
                      \u589E\u52A0\u7F29\u8FDB: "\u589E\u52A0\u7F29\u8FDB",
                      \u51CF\u5C11\u7F29\u8FDB: "\u51CF\u5C11\u7F29\u8FDB"
                    },
                    justify: {
                      \u9760\u5DE6: "\u9760\u5DE6",
                      \u5C45\u4E2D: "\u5C45\u4E2D",
                      \u9760\u53F3: "\u9760\u53F3",
                      \u4E24\u7AEF: "\u4E24\u7AEF"
                    },
                    list: {
                      \u65E0\u5E8F\u5217\u8868: "\u65E0\u5E8F\u5217\u8868",
                      \u6709\u5E8F\u5217\u8868: "\u6709\u5E8F\u5217\u8868"
                    }
                  },
                  panelMenus: {
                    emoticon: {
                      \u9ED8\u8BA4: "\u9ED8\u8BA4",
                      \u65B0\u6D6A: "\u65B0\u6D6A",
                      emoji: "emoji",
                      \u624B\u52BF: "\u624B\u52BF"
                    },
                    image: {
                      \u4E0A\u4F20\u56FE\u7247: "\u4E0A\u4F20\u56FE\u7247",
                      \u7F51\u7EDC\u56FE\u7247: "\u7F51\u7EDC\u56FE\u7247",
                      \u56FE\u7247\u5730\u5740: "\u56FE\u7247\u5730\u5740",
                      \u56FE\u7247\u6587\u5B57\u8BF4\u660E: "\u56FE\u7247\u6587\u5B57\u8BF4\u660E",
                      \u8DF3\u8F6C\u94FE\u63A5: "\u8DF3\u8F6C\u94FE\u63A5"
                    },
                    link: {
                      \u94FE\u63A5: "\u94FE\u63A5",
                      \u94FE\u63A5\u6587\u5B57: "\u94FE\u63A5\u6587\u5B57",
                      \u53D6\u6D88\u94FE\u63A5: "\u53D6\u6D88\u94FE\u63A5",
                      \u67E5\u770B\u94FE\u63A5: "\u67E5\u770B\u94FE\u63A5"
                    },
                    video: {
                      \u63D2\u5165\u89C6\u9891: "\u63D2\u5165\u89C6\u9891",
                      \u4E0A\u4F20\u89C6\u9891: "\u4E0A\u4F20\u89C6\u9891"
                    },
                    table: {
                      \u884C: "\u884C",
                      \u5217: "\u5217",
                      \u7684: "\u7684",
                      \u8868\u683C: "\u8868\u683C",
                      \u6DFB\u52A0\u884C: "\u6DFB\u52A0\u884C",
                      \u5220\u9664\u884C: "\u5220\u9664\u884C",
                      \u6DFB\u52A0\u5217: "\u6DFB\u52A0\u5217",
                      \u5220\u9664\u5217: "\u5220\u9664\u5217",
                      \u8BBE\u7F6E\u8868\u5934: "\u8BBE\u7F6E\u8868\u5934",
                      \u53D6\u6D88\u8868\u5934: "\u53D6\u6D88\u8868\u5934",
                      \u63D2\u5165\u8868\u683C: "\u63D2\u5165\u8868\u683C",
                      \u5220\u9664\u8868\u683C: "\u5220\u9664\u8868\u683C"
                    },
                    code: {
                      \u5220\u9664\u4EE3\u7801: "\u5220\u9664\u4EE3\u7801",
                      \u4FEE\u6539\u4EE3\u7801: "\u4FEE\u6539\u4EE3\u7801",
                      \u63D2\u5165\u4EE3\u7801: "\u63D2\u5165\u4EE3\u7801"
                    }
                  }
                },
                validate: {
                  \u5F20\u56FE\u7247: "\u5F20\u56FE\u7247",
                  \u5927\u4E8E: "\u5927\u4E8E",
                  \u56FE\u7247\u94FE\u63A5: "\u56FE\u7247\u94FE\u63A5",
                  \u4E0D\u662F\u56FE\u7247: "\u4E0D\u662F\u56FE\u7247",
                  \u8FD4\u56DE\u7ED3\u679C: "\u8FD4\u56DE\u7ED3\u679C",
                  \u4E0A\u4F20\u56FE\u7247\u8D85\u65F6: "\u4E0A\u4F20\u56FE\u7247\u8D85\u65F6",
                  \u4E0A\u4F20\u56FE\u7247\u9519\u8BEF: "\u4E0A\u4F20\u56FE\u7247\u9519\u8BEF",
                  \u4E0A\u4F20\u56FE\u7247\u5931\u8D25: "\u4E0A\u4F20\u56FE\u7247\u5931\u8D25",
                  \u63D2\u5165\u56FE\u7247\u9519\u8BEF: "\u63D2\u5165\u56FE\u7247\u9519\u8BEF",
                  \u4E00\u6B21\u6700\u591A\u4E0A\u4F20: "\u4E00\u6B21\u6700\u591A\u4E0A\u4F20",
                  \u4E0B\u8F7D\u94FE\u63A5\u5931\u8D25: "\u4E0B\u8F7D\u94FE\u63A5\u5931\u8D25",
                  \u56FE\u7247\u9A8C\u8BC1\u672A\u901A\u8FC7: "\u56FE\u7247\u9A8C\u8BC1\u672A\u901A\u8FC7",
                  \u670D\u52A1\u5668\u8FD4\u56DE\u72B6\u6001: "\u670D\u52A1\u5668\u8FD4\u56DE\u72B6\u6001",
                  \u4E0A\u4F20\u56FE\u7247\u8FD4\u56DE\u7ED3\u679C\u9519\u8BEF: "\u4E0A\u4F20\u56FE\u7247\u8FD4\u56DE\u7ED3\u679C\u9519\u8BEF",
                  \u8BF7\u66FF\u6362\u4E3A\u652F\u6301\u7684\u56FE\u7247\u7C7B\u578B: "\u8BF7\u66FF\u6362\u4E3A\u652F\u6301\u7684\u56FE\u7247\u7C7B\u578B",
                  \u60A8\u63D2\u5165\u7684\u7F51\u7EDC\u56FE\u7247\u65E0\u6CD5\u8BC6\u522B: "\u60A8\u63D2\u5165\u7684\u7F51\u7EDC\u56FE\u7247\u65E0\u6CD5\u8BC6\u522B",
                  \u60A8\u521A\u624D\u63D2\u5165\u7684\u56FE\u7247\u94FE\u63A5\u672A\u901A\u8FC7\u7F16\u8F91\u5668\u6821\u9A8C: "\u60A8\u521A\u624D\u63D2\u5165\u7684\u56FE\u7247\u94FE\u63A5\u672A\u901A\u8FC7\u7F16\u8F91\u5668\u6821\u9A8C",
                  \u63D2\u5165\u89C6\u9891\u9519\u8BEF: "\u63D2\u5165\u89C6\u9891\u9519\u8BEF",
                  \u89C6\u9891\u94FE\u63A5: "\u89C6\u9891\u94FE\u63A5",
                  \u4E0D\u662F\u89C6\u9891: "\u4E0D\u662F\u89C6\u9891",
                  \u89C6\u9891\u9A8C\u8BC1\u672A\u901A\u8FC7: "\u89C6\u9891\u9A8C\u8BC1\u672A\u901A\u8FC7",
                  \u4E2A\u89C6\u9891: "\u4E2A\u89C6\u9891",
                  \u4E0A\u4F20\u89C6\u9891\u8D85\u65F6: "\u4E0A\u4F20\u89C6\u9891\u8D85\u65F6",
                  \u4E0A\u4F20\u89C6\u9891\u9519\u8BEF: "\u4E0A\u4F20\u89C6\u9891\u9519\u8BEF",
                  \u4E0A\u4F20\u89C6\u9891\u5931\u8D25: "\u4E0A\u4F20\u89C6\u9891\u5931\u8D25",
                  \u4E0A\u4F20\u89C6\u9891\u8FD4\u56DE\u7ED3\u679C\u9519\u8BEF: "\u4E0A\u4F20\u89C6\u9891\u8FD4\u56DE\u7ED3\u679C\u9519\u8BEF"
                }
              }
            },
            en: {
              wangEditor: {
                \u91CD\u7F6E: "reset",
                \u63D2\u5165: "insert",
                \u9ED8\u8BA4: "default",
                \u521B\u5EFA: "create",
                \u4FEE\u6539: "edit",
                \u5982: "like",
                \u8BF7\u8F93\u5165\u6B63\u6587: "please enter the text",
                menus: {
                  title: {
                    \u6807\u9898: "head",
                    \u52A0\u7C97: "bold",
                    \u5B57\u53F7: "font size",
                    \u5B57\u4F53: "font family",
                    \u659C\u4F53: "italic",
                    \u4E0B\u5212\u7EBF: "underline",
                    \u5220\u9664\u7EBF: "strikethrough",
                    \u7F29\u8FDB: "indent",
                    \u884C\u9AD8: "line heihgt",
                    \u6587\u5B57\u989C\u8272: "font color",
                    \u80CC\u666F\u8272: "background",
                    \u94FE\u63A5: "link",
                    \u5E8F\u5217: "numbered list",
                    \u5BF9\u9F50: "align",
                    \u5F15\u7528: "quote",
                    \u8868\u60C5: "emoticons",
                    \u56FE\u7247: "image",
                    \u89C6\u9891: "media",
                    \u8868\u683C: "table",
                    \u4EE3\u7801: "code",
                    \u5206\u5272\u7EBF: "split line",
                    \u6062\u590D: "undo",
                    \u64A4\u9500: "redo",
                    \u5168\u5C4F: "fullscreen",
                    \u53D6\u6D88\u5168\u5C4F: "cancel fullscreen",
                    \u5F85\u529E\u4E8B\u9879: "todo"
                  },
                  dropListMenu: {
                    \u8BBE\u7F6E\u6807\u9898: "title",
                    \u80CC\u666F\u989C\u8272: "background",
                    \u6587\u5B57\u989C\u8272: "font color",
                    \u8BBE\u7F6E\u5B57\u53F7: "font size",
                    \u8BBE\u7F6E\u5B57\u4F53: "font family",
                    \u8BBE\u7F6E\u7F29\u8FDB: "indent",
                    \u5BF9\u9F50\u65B9\u5F0F: "align",
                    \u8BBE\u7F6E\u884C\u9AD8: "line heihgt",
                    \u5E8F\u5217: "list",
                    head: {
                      \u6B63\u6587: "text"
                    },
                    indent: {
                      \u589E\u52A0\u7F29\u8FDB: "indent",
                      \u51CF\u5C11\u7F29\u8FDB: "outdent"
                    },
                    justify: {
                      \u9760\u5DE6: "left",
                      \u5C45\u4E2D: "center",
                      \u9760\u53F3: "right",
                      \u4E24\u7AEF: "justify"
                    },
                    list: {
                      \u65E0\u5E8F\u5217\u8868: "unordered",
                      \u6709\u5E8F\u5217\u8868: "ordered"
                    }
                  },
                  panelMenus: {
                    emoticon: {
                      \u8868\u60C5: "emoji",
                      \u624B\u52BF: "gesture"
                    },
                    image: {
                      \u4E0A\u4F20\u56FE\u7247: "upload image",
                      \u7F51\u7EDC\u56FE\u7247: "network image",
                      \u56FE\u7247\u5730\u5740: "image link",
                      \u56FE\u7247\u6587\u5B57\u8BF4\u660E: "image alt",
                      \u8DF3\u8F6C\u94FE\u63A5: "hyperlink"
                    },
                    link: {
                      \u94FE\u63A5: "link",
                      \u94FE\u63A5\u6587\u5B57: "link text",
                      \u53D6\u6D88\u94FE\u63A5: "unlink",
                      \u67E5\u770B\u94FE\u63A5: "view links"
                    },
                    video: {
                      \u63D2\u5165\u89C6\u9891: "insert video",
                      \u4E0A\u4F20\u89C6\u9891: "upload local video"
                    },
                    table: {
                      \u884C: "rows",
                      \u5217: "columns",
                      \u7684: " ",
                      \u8868\u683C: "table",
                      \u6DFB\u52A0\u884C: "insert row",
                      \u5220\u9664\u884C: "delete row",
                      \u6DFB\u52A0\u5217: "insert column",
                      \u5220\u9664\u5217: "delete column",
                      \u8BBE\u7F6E\u8868\u5934: "set header",
                      \u53D6\u6D88\u8868\u5934: "cancel header",
                      \u63D2\u5165\u8868\u683C: "insert table",
                      \u5220\u9664\u8868\u683C: "delete table"
                    },
                    code: {
                      \u5220\u9664\u4EE3\u7801: "delete code",
                      \u4FEE\u6539\u4EE3\u7801: "edit code",
                      \u63D2\u5165\u4EE3\u7801: "insert code"
                    }
                  }
                },
                validate: {
                  \u5F20\u56FE\u7247: "images",
                  \u5927\u4E8E: "greater than",
                  \u56FE\u7247\u94FE\u63A5: "image link",
                  \u4E0D\u662F\u56FE\u7247: "is not image",
                  \u8FD4\u56DE\u7ED3\u679C: "return results",
                  \u4E0A\u4F20\u56FE\u7247\u8D85\u65F6: "upload image timeout",
                  \u4E0A\u4F20\u56FE\u7247\u9519\u8BEF: "upload image error",
                  \u4E0A\u4F20\u56FE\u7247\u5931\u8D25: "upload image failed",
                  \u63D2\u5165\u56FE\u7247\u9519\u8BEF: "insert image error",
                  \u4E00\u6B21\u6700\u591A\u4E0A\u4F20: "once most at upload",
                  \u4E0B\u8F7D\u94FE\u63A5\u5931\u8D25: "download link failed",
                  \u56FE\u7247\u9A8C\u8BC1\u672A\u901A\u8FC7: "image validate failed",
                  \u670D\u52A1\u5668\u8FD4\u56DE\u72B6\u6001: "server return status",
                  \u4E0A\u4F20\u56FE\u7247\u8FD4\u56DE\u7ED3\u679C\u9519\u8BEF: "upload image return results error",
                  \u8BF7\u66FF\u6362\u4E3A\u652F\u6301\u7684\u56FE\u7247\u7C7B\u578B: "please replace with a supported image type",
                  \u60A8\u63D2\u5165\u7684\u7F51\u7EDC\u56FE\u7247\u65E0\u6CD5\u8BC6\u522B: "the network picture you inserted is not recognized",
                  \u60A8\u521A\u624D\u63D2\u5165\u7684\u56FE\u7247\u94FE\u63A5\u672A\u901A\u8FC7\u7F16\u8F91\u5668\u6821\u9A8C: "the image link you just inserted did not pass the editor verification",
                  \u63D2\u5165\u89C6\u9891\u9519\u8BEF: "insert video error",
                  \u89C6\u9891\u94FE\u63A5: "video link",
                  \u4E0D\u662F\u89C6\u9891: "is not video",
                  \u89C6\u9891\u9A8C\u8BC1\u672A\u901A\u8FC7: "video validate failed",
                  \u4E2A\u89C6\u9891: "videos",
                  \u4E0A\u4F20\u89C6\u9891\u8D85\u65F6: "upload video timeout",
                  \u4E0A\u4F20\u89C6\u9891\u9519\u8BEF: "upload video error",
                  \u4E0A\u4F20\u89C6\u9891\u5931\u8D25: "upload video failed",
                  \u4E0A\u4F20\u89C6\u9891\u8FD4\u56DE\u7ED3\u679C\u9519\u8BEF: "upload video return results error"
                }
              }
            }
          }
        };
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var util_1 = __webpack_require__(6);
        function compatibleMode() {
          if (util_1.UA.isIE() || util_1.UA.isOldEdge) {
            return true;
          }
          return false;
        }
        exports2["default"] = {
          compatibleMode,
          historyMaxSize: 30
        };
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var const_1 = __webpack_require__(7);
        exports2["default"] = {
          onlineVideoCheck: function onlineVideoCheck(video) {
            return true;
          },
          onlineVideoCallback: const_1.EMPTY_FN,
          showLinkVideo: true,
          uploadVideoAccept: ["mp4"],
          uploadVideoServer: "",
          uploadVideoMaxSize: 1 * 1024 * 1024 * 1024,
          uploadVideoName: "",
          uploadVideoParams: {},
          uploadVideoParamsWithUrl: false,
          uploadVideoHeaders: {},
          uploadVideoHooks: {},
          uploadVideoTimeout: 1e3 * 60 * 60 * 2,
          withVideoCredentials: false,
          customUploadVideo: null,
          customInsertVideo: null
        };
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _trim = _interopRequireDefault(__webpack_require__(17));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var util_1 = __webpack_require__(6);
        var const_1 = __webpack_require__(7);
        var SelectionAndRange = function() {
          function SelectionAndRange2(editor) {
            this._currentRange = null;
            this.editor = editor;
          }
          SelectionAndRange2.prototype.getRange = function() {
            return this._currentRange;
          };
          SelectionAndRange2.prototype.saveRange = function(_range) {
            if (_range) {
              this._currentRange = _range;
              return;
            }
            var selection = window.getSelection();
            if (selection.rangeCount === 0) {
              return;
            }
            var range = selection.getRangeAt(0);
            var $containerElem = this.getSelectionContainerElem(range);
            if (!($containerElem === null || $containerElem === void 0 ? void 0 : $containerElem.length)) {
              return;
            }
            if ($containerElem.attr("contenteditable") === "false" || $containerElem.parentUntil("[contenteditable=false]")) {
              return;
            }
            var editor = this.editor;
            var $textElem = editor.$textElem;
            if ($textElem.isContain($containerElem)) {
              if ($textElem.elems[0] === $containerElem.elems[0]) {
                var _context;
                if ((0, _trim["default"])(_context = $textElem.html()).call(_context) === const_1.EMPTY_P) {
                  var $children = $textElem.children();
                  var $last = $children === null || $children === void 0 ? void 0 : $children.last();
                  editor.selection.createRangeByElem($last, true, true);
                  editor.selection.restoreSelection();
                }
              }
              this._currentRange = range;
            }
          };
          SelectionAndRange2.prototype.collapseRange = function(toStart) {
            if (toStart === void 0) {
              toStart = false;
            }
            var range = this._currentRange;
            if (range) {
              range.collapse(toStart);
            }
          };
          SelectionAndRange2.prototype.getSelectionText = function() {
            var range = this._currentRange;
            if (range) {
              return range.toString();
            } else {
              return "";
            }
          };
          SelectionAndRange2.prototype.getSelectionContainerElem = function(range) {
            var r;
            r = range || this._currentRange;
            var elem;
            if (r) {
              elem = r.commonAncestorContainer;
              return dom_core_1["default"](elem.nodeType === 1 ? elem : elem.parentNode);
            }
          };
          SelectionAndRange2.prototype.getSelectionStartElem = function(range) {
            var r;
            r = range || this._currentRange;
            var elem;
            if (r) {
              elem = r.startContainer;
              return dom_core_1["default"](elem.nodeType === 1 ? elem : elem.parentNode);
            }
          };
          SelectionAndRange2.prototype.getSelectionEndElem = function(range) {
            var r;
            r = range || this._currentRange;
            var elem;
            if (r) {
              elem = r.endContainer;
              return dom_core_1["default"](elem.nodeType === 1 ? elem : elem.parentNode);
            }
          };
          SelectionAndRange2.prototype.isSelectionEmpty = function() {
            var range = this._currentRange;
            if (range && range.startContainer) {
              if (range.startContainer === range.endContainer) {
                if (range.startOffset === range.endOffset) {
                  return true;
                }
              }
            }
            return false;
          };
          SelectionAndRange2.prototype.restoreSelection = function() {
            var selection = window.getSelection();
            var r = this._currentRange;
            if (selection && r) {
              selection.removeAllRanges();
              selection.addRange(r);
            }
          };
          SelectionAndRange2.prototype.createEmptyRange = function() {
            var editor = this.editor;
            var range = this.getRange();
            var $elem;
            if (!range) {
              return;
            }
            if (!this.isSelectionEmpty()) {
              return;
            }
            try {
              if (util_1.UA.isWebkit()) {
                editor.cmd["do"]("insertHTML", "&#8203;");
                range.setEnd(range.endContainer, range.endOffset + 1);
                this.saveRange(range);
              } else {
                $elem = dom_core_1["default"]("<strong>&#8203;</strong>");
                editor.cmd["do"]("insertElem", $elem);
                this.createRangeByElem($elem, true);
              }
            } catch (ex) {
            }
          };
          SelectionAndRange2.prototype.createRangeByElems = function(startDom, endDom) {
            var selection = window.getSelection ? window.getSelection() : document.getSelection();
            selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
            var range = document.createRange();
            range.setStart(startDom, 0);
            range.setEnd(endDom, endDom.childNodes.length || 1);
            this.saveRange(range);
            this.restoreSelection();
          };
          SelectionAndRange2.prototype.createRangeByElem = function($elem, toStart, isContent) {
            if (!$elem.length) {
              return;
            }
            var elem = $elem.elems[0];
            var range = document.createRange();
            if (isContent) {
              range.selectNodeContents(elem);
            } else {
              range.selectNode(elem);
            }
            if (toStart != null) {
              range.collapse(toStart);
              if (!toStart) {
                this.saveRange(range);
                this.editor.selection.moveCursor(elem);
              }
            }
            this.saveRange(range);
          };
          SelectionAndRange2.prototype.getSelectionRangeTopNodes = function() {
            var _a, _b;
            var $nodeList;
            var $startElem = (_a = this.getSelectionStartElem()) === null || _a === void 0 ? void 0 : _a.getNodeTop(this.editor);
            var $endElem = (_b = this.getSelectionEndElem()) === null || _b === void 0 ? void 0 : _b.getNodeTop(this.editor);
            $nodeList = this.recordSelectionNodes(dom_core_1["default"]($startElem), dom_core_1["default"]($endElem));
            return $nodeList;
          };
          SelectionAndRange2.prototype.moveCursor = function(node, position) {
            var _a;
            var range = this.getRange();
            var len = node.nodeType === 3 ? (_a = node.nodeValue) === null || _a === void 0 ? void 0 : _a.length : node.childNodes.length;
            if ((util_1.UA.isFirefox || util_1.UA.isIE()) && len !== 0) {
              if (node.nodeType === 3 || node.childNodes[len - 1].nodeName === "BR") {
                len = len - 1;
              }
            }
            var pos = position !== null && position !== void 0 ? position : len;
            if (!range) {
              return;
            }
            if (node) {
              range.setStart(node, pos);
              range.setEnd(node, pos);
              this.restoreSelection();
            }
          };
          SelectionAndRange2.prototype.getCursorPos = function() {
            var selection = window.getSelection();
            return selection === null || selection === void 0 ? void 0 : selection.anchorOffset;
          };
          SelectionAndRange2.prototype.clearWindowSelectionRange = function() {
            var selection = window.getSelection();
            if (selection) {
              selection.removeAllRanges();
            }
          };
          SelectionAndRange2.prototype.recordSelectionNodes = function($node, $endElem) {
            var $list = [];
            var isEnd = true;
            try {
              var $NODE = $node;
              var $textElem = this.editor.$textElem;
              while (isEnd) {
                var $elem = $NODE === null || $NODE === void 0 ? void 0 : $NODE.getNodeTop(this.editor);
                if ($elem.getNodeName() === "BODY")
                  isEnd = false;
                if ($elem.length > 0) {
                  $list.push(dom_core_1["default"]($NODE));
                  if (($endElem === null || $endElem === void 0 ? void 0 : $endElem.equal($elem)) || $textElem.equal($elem)) {
                    isEnd = false;
                  } else {
                    $NODE = $elem.getNextSibling();
                  }
                }
              }
            } catch (e) {
              isEnd = false;
            }
            return $list;
          };
          SelectionAndRange2.prototype.setRangeToElem = function(node) {
            var range = this.getRange();
            range === null || range === void 0 ? void 0 : range.setStart(node, 0);
            range === null || range === void 0 ? void 0 : range.setEnd(node, 0);
          };
          return SelectionAndRange2;
        }();
        exports2["default"] = SelectionAndRange;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var Command = function() {
          function Command2(editor) {
            this.editor = editor;
          }
          Command2.prototype["do"] = function(name, value) {
            var editor = this.editor;
            if (editor.config.styleWithCSS) {
              document.execCommand("styleWithCSS", false, "true");
            }
            var selection = editor.selection;
            if (!selection.getRange()) {
              return;
            }
            selection.restoreSelection();
            switch (name) {
              case "insertHTML":
                this.insertHTML(value);
                break;
              case "insertElem":
                this.insertElem(value);
                break;
              default:
                this.execCommand(name, value);
                break;
            }
            editor.menus.changeActive();
            selection.saveRange();
            selection.restoreSelection();
          };
          Command2.prototype.insertHTML = function(html) {
            var editor = this.editor;
            var range = editor.selection.getRange();
            if (range == null)
              return;
            if (this.queryCommandSupported("insertHTML")) {
              this.execCommand("insertHTML", html);
            } else if (range.insertNode) {
              range.deleteContents();
              if (dom_core_1["default"](html).elems.length > 0) {
                range.insertNode(dom_core_1["default"](html).elems[0]);
              } else {
                var newNode = document.createElement("p");
                newNode.appendChild(document.createTextNode(html));
                range.insertNode(newNode);
              }
              editor.selection.collapseRange();
            }
          };
          Command2.prototype.insertElem = function($elem) {
            var editor = this.editor;
            var range = editor.selection.getRange();
            if (range == null)
              return;
            if (range.insertNode) {
              range.deleteContents();
              range.insertNode($elem.elems[0]);
            }
          };
          Command2.prototype.execCommand = function(name, value) {
            document.execCommand(name, false, value);
          };
          Command2.prototype.queryCommandValue = function(name) {
            return document.queryCommandValue(name);
          };
          Command2.prototype.queryCommandState = function(name) {
            return document.queryCommandState(name);
          };
          Command2.prototype.queryCommandSupported = function(name) {
            return document.queryCommandSupported(name);
          };
          return Command2;
        }();
        exports2["default"] = Command;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _find = _interopRequireDefault(__webpack_require__(29));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _trim = _interopRequireDefault(__webpack_require__(17));
        var _indexOf = _interopRequireDefault(__webpack_require__(27));
        var _setTimeout2 = _interopRequireDefault(__webpack_require__(46));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var index_1 = tslib_1.__importDefault(__webpack_require__(287));
        var util_1 = __webpack_require__(6);
        var getChildrenJSON_1 = tslib_1.__importDefault(__webpack_require__(299));
        var getHtmlByNodeList_1 = tslib_1.__importDefault(__webpack_require__(300));
        var const_1 = __webpack_require__(7);
        var Text = function() {
          function Text2(editor) {
            this.editor = editor;
            this.eventHooks = {
              onBlurEvents: [],
              changeEvents: [],
              dropEvents: [],
              clickEvents: [],
              keydownEvents: [],
              keyupEvents: [],
              tabUpEvents: [],
              tabDownEvents: [],
              enterUpEvents: [],
              enterDownEvents: [],
              deleteUpEvents: [],
              deleteDownEvents: [],
              pasteEvents: [],
              linkClickEvents: [],
              codeClickEvents: [],
              textScrollEvents: [],
              toolbarClickEvents: [],
              imgClickEvents: [],
              imgDragBarMouseDownEvents: [],
              tableClickEvents: [],
              menuClickEvents: [],
              dropListMenuHoverEvents: [],
              splitLineEvents: [],
              videoClickEvents: []
            };
          }
          Text2.prototype.init = function() {
            this._saveRange();
            this._bindEventHooks();
            index_1["default"](this);
          };
          Text2.prototype.togglePlaceholder = function() {
            var _context;
            var html = this.html();
            var $placeholder = (0, _find["default"])(_context = this.editor.$textContainerElem).call(_context, ".placeholder");
            $placeholder.hide();
            if (this.editor.isComposing)
              return;
            if (!html || html === " ")
              $placeholder.show();
          };
          Text2.prototype.clear = function() {
            this.html(const_1.EMPTY_P);
          };
          Text2.prototype.html = function(val) {
            var editor = this.editor;
            var $textElem = editor.$textElem;
            if (val == null) {
              var html_1 = $textElem.html();
              html_1 = html_1.replace(/\u200b/gm, "");
              html_1 = html_1.replace(/<p><\/p>/gim, "");
              html_1 = html_1.replace(const_1.EMPTY_P_LAST_REGEX, "");
              html_1 = html_1.replace(const_1.EMPTY_P_REGEX, "<p>");
              var selfCloseHtmls = html_1.match(/<(img|br|hr|input)[^>]*>/gi);
              if (selfCloseHtmls !== null) {
                (0, _forEach["default"])(selfCloseHtmls).call(selfCloseHtmls, function(item) {
                  if (!item.match(/\/>/)) {
                    html_1 = html_1.replace(item, item.substring(0, item.length - 1) + "/>");
                  }
                });
              }
              return html_1;
            }
            val = (0, _trim["default"])(val).call(val);
            if (val === "") {
              val = const_1.EMPTY_P;
            }
            if ((0, _indexOf["default"])(val).call(val, "<") !== 0) {
              val = "<p>" + val + "</p>";
            }
            $textElem.html(val);
            editor.initSelection();
          };
          Text2.prototype.setJSON = function(nodeList) {
            var html = getHtmlByNodeList_1["default"](nodeList).children();
            var editor = this.editor;
            var $textElem = editor.$textElem;
            if (!html)
              return;
            $textElem.replaceChildAll(html);
          };
          Text2.prototype.getJSON = function() {
            var editor = this.editor;
            var $textElem = editor.$textElem;
            return getChildrenJSON_1["default"]($textElem);
          };
          Text2.prototype.text = function(val) {
            var editor = this.editor;
            var $textElem = editor.$textElem;
            if (val == null) {
              var text = $textElem.text();
              text = text.replace(/\u200b/gm, "");
              return text;
            }
            $textElem.text("<p>" + val + "</p>");
            editor.initSelection();
          };
          Text2.prototype.append = function(html) {
            var editor = this.editor;
            if ((0, _indexOf["default"])(html).call(html, "<") !== 0) {
              html = "<p>" + html + "</p>";
            }
            this.html(this.html() + html);
            editor.initSelection();
          };
          Text2.prototype._saveRange = function() {
            var editor = this.editor;
            var $textElem = editor.$textElem;
            var $document = dom_core_1["default"](document);
            function saveRange() {
              editor.selection.saveRange();
              editor.menus.changeActive();
            }
            $textElem.on("keyup", saveRange);
            function onceClickSaveRange() {
              saveRange();
              $textElem.off("click", onceClickSaveRange);
            }
            $textElem.on("click", onceClickSaveRange);
            function handleMouseUp() {
              saveRange();
              $document.off("mouseup", handleMouseUp);
            }
            function listenMouseLeave() {
              $document.on("mouseup", handleMouseUp);
              $textElem.off("mouseleave", listenMouseLeave);
            }
            $textElem.on("mousedown", function() {
              $textElem.on("mouseleave", listenMouseLeave);
            });
            $textElem.on("mouseup", function(e) {
              $textElem.off("mouseleave", listenMouseLeave);
              (0, _setTimeout2["default"])(function() {
                var selection = editor.selection;
                var range = selection.getRange();
                if (range === null)
                  return;
                saveRange();
              }, 0);
            });
          };
          Text2.prototype._bindEventHooks = function() {
            var editor = this.editor;
            var $textElem = editor.$textElem;
            var eventHooks = this.eventHooks;
            $textElem.on("click", function(e) {
              var clickEvents = eventHooks.clickEvents;
              (0, _forEach["default"])(clickEvents).call(clickEvents, function(fn) {
                return fn(e);
              });
            });
            $textElem.on("keyup", function(e) {
              if (e.keyCode !== 13)
                return;
              var enterUpEvents = eventHooks.enterUpEvents;
              (0, _forEach["default"])(enterUpEvents).call(enterUpEvents, function(fn) {
                return fn(e);
              });
            });
            $textElem.on("keyup", function(e) {
              var keyupEvents = eventHooks.keyupEvents;
              (0, _forEach["default"])(keyupEvents).call(keyupEvents, function(fn) {
                return fn(e);
              });
            });
            $textElem.on("keydown", function(e) {
              var keydownEvents = eventHooks.keydownEvents;
              (0, _forEach["default"])(keydownEvents).call(keydownEvents, function(fn) {
                return fn(e);
              });
            });
            $textElem.on("keyup", function(e) {
              if (e.keyCode !== 8 && e.keyCode !== 46)
                return;
              var deleteUpEvents = eventHooks.deleteUpEvents;
              (0, _forEach["default"])(deleteUpEvents).call(deleteUpEvents, function(fn) {
                return fn(e);
              });
            });
            $textElem.on("keydown", function(e) {
              if (e.keyCode !== 8 && e.keyCode !== 46)
                return;
              var deleteDownEvents = eventHooks.deleteDownEvents;
              (0, _forEach["default"])(deleteDownEvents).call(deleteDownEvents, function(fn) {
                return fn(e);
              });
            });
            $textElem.on("paste", function(e) {
              if (util_1.UA.isIE())
                return;
              e.preventDefault();
              var pasteEvents = eventHooks.pasteEvents;
              (0, _forEach["default"])(pasteEvents).call(pasteEvents, function(fn) {
                return fn(e);
              });
            });
            $textElem.on("keydown", function(e) {
              if ((editor.isFocus || editor.isCompatibleMode) && (e.ctrlKey || e.metaKey) && e.keyCode === 90) {
                e.preventDefault();
                if (e.shiftKey) {
                  editor.history.restore();
                } else {
                  editor.history.revoke();
                }
              }
            });
            $textElem.on("keyup", function(e) {
              if (e.keyCode !== 9)
                return;
              e.preventDefault();
              var tabUpEvents = eventHooks.tabUpEvents;
              (0, _forEach["default"])(tabUpEvents).call(tabUpEvents, function(fn) {
                return fn(e);
              });
            });
            $textElem.on("keydown", function(e) {
              if (e.keyCode !== 9)
                return;
              e.preventDefault();
              var tabDownEvents = eventHooks.tabDownEvents;
              (0, _forEach["default"])(tabDownEvents).call(tabDownEvents, function(fn) {
                return fn(e);
              });
            });
            $textElem.on("scroll", util_1.throttle(function(e) {
              var textScrollEvents = eventHooks.textScrollEvents;
              (0, _forEach["default"])(textScrollEvents).call(textScrollEvents, function(fn) {
                return fn(e);
              });
            }, 100));
            function preventDefault(e) {
              e.preventDefault();
            }
            dom_core_1["default"](document).on("dragleave", preventDefault).on("drop", preventDefault).on("dragenter", preventDefault).on("dragover", preventDefault);
            editor.beforeDestroy(function() {
              dom_core_1["default"](document).off("dragleave", preventDefault).off("drop", preventDefault).off("dragenter", preventDefault).off("dragover", preventDefault);
            });
            $textElem.on("drop", function(e) {
              e.preventDefault();
              var events = eventHooks.dropEvents;
              (0, _forEach["default"])(events).call(events, function(fn) {
                return fn(e);
              });
            });
            $textElem.on("click", function(e) {
              var $link = null;
              var target = e.target;
              var $target = dom_core_1["default"](target);
              if ($target.getNodeName() === "A") {
                $link = $target;
              } else {
                var $parent = $target.parentUntil("a");
                if ($parent != null) {
                  $link = $parent;
                }
              }
              if (!$link)
                return;
              var linkClickEvents = eventHooks.linkClickEvents;
              (0, _forEach["default"])(linkClickEvents).call(linkClickEvents, function(fn) {
                return fn($link);
              });
            });
            $textElem.on("click", function(e) {
              var $img = null;
              var target = e.target;
              var $target = dom_core_1["default"](target);
              if ($target.getNodeName() === "IMG" && !$target.elems[0].getAttribute("data-emoji")) {
                e.stopPropagation();
                $img = $target;
              }
              if (!$img)
                return;
              var imgClickEvents = eventHooks.imgClickEvents;
              (0, _forEach["default"])(imgClickEvents).call(imgClickEvents, function(fn) {
                return fn($img);
              });
            });
            $textElem.on("click", function(e) {
              var $code = null;
              var target = e.target;
              var $target = dom_core_1["default"](target);
              if ($target.getNodeName() === "PRE") {
                $code = $target;
              } else {
                var $parent = $target.parentUntil("pre");
                if ($parent !== null) {
                  $code = $parent;
                }
              }
              if (!$code)
                return;
              var codeClickEvents = eventHooks.codeClickEvents;
              (0, _forEach["default"])(codeClickEvents).call(codeClickEvents, function(fn) {
                return fn($code);
              });
            });
            $textElem.on("click", function(e) {
              var $splitLine = null;
              var target = e.target;
              var $target = dom_core_1["default"](target);
              if ($target.getNodeName() === "HR") {
                $splitLine = $target;
              }
              if (!$splitLine)
                return;
              editor.selection.createRangeByElem($splitLine);
              editor.selection.restoreSelection();
              var splitLineClickEvents = eventHooks.splitLineEvents;
              (0, _forEach["default"])(splitLineClickEvents).call(splitLineClickEvents, function(fn) {
                return fn($splitLine);
              });
            });
            editor.$toolbarElem.on("click", function(e) {
              var toolbarClickEvents = eventHooks.toolbarClickEvents;
              (0, _forEach["default"])(toolbarClickEvents).call(toolbarClickEvents, function(fn) {
                return fn(e);
              });
            });
            editor.$textContainerElem.on("mousedown", function(e) {
              var target = e.target;
              var $target = dom_core_1["default"](target);
              if ($target.hasClass("w-e-img-drag-rb")) {
                var imgDragBarMouseDownEvents = eventHooks.imgDragBarMouseDownEvents;
                (0, _forEach["default"])(imgDragBarMouseDownEvents).call(imgDragBarMouseDownEvents, function(fn) {
                  return fn();
                });
              }
            });
            $textElem.on("click", function(e) {
              var $dom = null;
              var target = e.target;
              $dom = dom_core_1["default"](target).parentUntilEditor("TABLE", editor, target);
              if (!$dom)
                return;
              var tableClickEvents = eventHooks.tableClickEvents;
              (0, _forEach["default"])(tableClickEvents).call(tableClickEvents, function(fn) {
                return fn($dom, e);
              });
            });
            $textElem.on("keydown", function(e) {
              if (e.keyCode !== 13)
                return;
              var enterDownEvents = eventHooks.enterDownEvents;
              (0, _forEach["default"])(enterDownEvents).call(enterDownEvents, function(fn) {
                return fn(e);
              });
            });
            $textElem.on("click", function(e) {
              var $video = null;
              var target = e.target;
              var $target = dom_core_1["default"](target);
              if ($target.getNodeName() === "VIDEO") {
                e.stopPropagation();
                $video = $target;
              }
              if (!$video)
                return;
              var videoClickEvents = eventHooks.videoClickEvents;
              (0, _forEach["default"])(videoClickEvents).call(videoClickEvents, function(fn) {
                return fn($video);
              });
            });
          };
          return Text2;
        }();
        exports2["default"] = Text;
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(284);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        var find = __webpack_require__(285);
        var ArrayPrototype = Array.prototype;
        module2.exports = function(it) {
          var own = it.find;
          return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.find ? find : own;
        };
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(286);
        var entryVirtual = __webpack_require__(15);
        module2.exports = entryVirtual("Array").find;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var $find = __webpack_require__(32).find;
        var addToUnscopables = __webpack_require__(82);
        var arrayMethodUsesToLength = __webpack_require__(22);
        var FIND = "find";
        var SKIPS_HOLES = true;
        var USES_TO_LENGTH = arrayMethodUsesToLength(FIND);
        if (FIND in [])
          Array(1)[FIND](function() {
            SKIPS_HOLES = false;
          });
        $({ target: "Array", proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
          find: function find(callbackfn) {
            return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
        addToUnscopables(FIND);
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var enter_to_create_p_1 = tslib_1.__importDefault(__webpack_require__(288));
        var del_to_keep_p_1 = tslib_1.__importStar(__webpack_require__(289));
        var tab_to_space_1 = tslib_1.__importDefault(__webpack_require__(290));
        var paste_text_html_1 = tslib_1.__importDefault(__webpack_require__(291));
        var img_click_active_1 = tslib_1.__importDefault(__webpack_require__(298));
        function initTextHooks(text) {
          var editor = text.editor;
          var eventHooks = text.eventHooks;
          enter_to_create_p_1["default"](editor, eventHooks.enterUpEvents, eventHooks.enterDownEvents);
          del_to_keep_p_1["default"](editor, eventHooks.deleteUpEvents, eventHooks.deleteDownEvents);
          del_to_keep_p_1.cutToKeepP(editor, eventHooks.keyupEvents);
          tab_to_space_1["default"](editor, eventHooks.tabDownEvents);
          paste_text_html_1["default"](editor, eventHooks.pasteEvents);
          img_click_active_1["default"](editor, eventHooks.imgClickEvents);
        }
        exports2["default"] = initTextHooks;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _indexOf = _interopRequireDefault(__webpack_require__(27));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var const_1 = __webpack_require__(7);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        function enterToCreateP(editor, enterUpEvents, enterDownEvents) {
          function insertEmptyP($selectionElem) {
            var _context;
            var $p = dom_core_1["default"](const_1.EMPTY_P);
            $p.insertBefore($selectionElem);
            if ((0, _indexOf["default"])(_context = $selectionElem.html()).call(_context, "<img") >= 0) {
              $p.remove();
              return;
            }
            editor.selection.createRangeByElem($p, true, true);
            editor.selection.restoreSelection();
            $selectionElem.remove();
          }
          function fn() {
            var $textElem = editor.$textElem;
            var $selectionElem = editor.selection.getSelectionContainerElem();
            var $parentElem = $selectionElem.parent();
            if ($parentElem.html() === "<code><br></code>") {
              insertEmptyP($parentElem);
              return;
            }
            if ($selectionElem.getNodeName() === "FONT" && $selectionElem.text() === "" && $selectionElem.attr("face") === "monospace") {
              insertEmptyP($parentElem);
              return;
            }
            if (!$parentElem.equal($textElem)) {
              return;
            }
            var nodeName = $selectionElem.getNodeName();
            if (nodeName === "P" && $selectionElem.attr("data-we-empty-p") === null) {
              return;
            }
            if ($selectionElem.text()) {
              return;
            }
            insertEmptyP($selectionElem);
          }
          enterUpEvents.push(fn);
          function createPWhenEnterText(e) {
            var _a;
            editor.selection.saveRange((_a = getSelection()) === null || _a === void 0 ? void 0 : _a.getRangeAt(0));
            var $selectElem = editor.selection.getSelectionContainerElem();
            if ($selectElem.id === editor.textElemId) {
              e.preventDefault();
              editor.cmd["do"]("insertHTML", "<p><br></p>");
            }
          }
          enterDownEvents.push(createPWhenEnterText);
        }
        exports2["default"] = enterToCreateP;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _trim = _interopRequireDefault(__webpack_require__(17));
        var _includes = _interopRequireDefault(__webpack_require__(28));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.cutToKeepP = void 0;
        var tslib_1 = __webpack_require__(2);
        var const_1 = __webpack_require__(7);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        function deleteToKeepP(editor, deleteUpEvents, deleteDownEvents) {
          function upFn() {
            var $textElem = editor.$textElem;
            var html = editor.$textElem.html();
            var text = editor.$textElem.text();
            var txtHtml = (0, _trim["default"])(html).call(html);
            var emptyTags = ["<p><br></p>", "<br>", '<p data-we-empty-p=""></p>', const_1.EMPTY_P];
            if (/^\s*$/.test(text) && (!txtHtml || (0, _includes["default"])(emptyTags).call(emptyTags, txtHtml))) {
              $textElem.html(const_1.EMPTY_P);
              var containerElem = $textElem.getNode();
              editor.selection.createRangeByElems(containerElem.childNodes[0], containerElem.childNodes[0]);
              var $selectionElem = editor.selection.getSelectionContainerElem();
              editor.selection.restoreSelection();
              editor.selection.moveCursor($selectionElem.getNode(), 0);
            }
          }
          deleteUpEvents.push(upFn);
          function downFn(e) {
            var _context;
            var $textElem = editor.$textElem;
            var txtHtml = (0, _trim["default"])(_context = $textElem.html().toLowerCase()).call(_context);
            if (txtHtml === const_1.EMPTY_P) {
              e.preventDefault();
              return;
            }
          }
          deleteDownEvents.push(downFn);
        }
        function cutToKeepP(editor, cutEvents) {
          function upFn(e) {
            var _context2;
            if (e.keyCode !== 88) {
              return;
            }
            var $textElem = editor.$textElem;
            var txtHtml = (0, _trim["default"])(_context2 = $textElem.html().toLowerCase()).call(_context2);
            if (!txtHtml || txtHtml === "<br>") {
              var $p = dom_core_1["default"](const_1.EMPTY_P);
              $textElem.html(" ");
              $textElem.append($p);
              editor.selection.createRangeByElem($p, false, true);
              editor.selection.restoreSelection();
              editor.selection.moveCursor($p.getNode(), 0);
            }
          }
          cutEvents.push(upFn);
        }
        exports2.cutToKeepP = cutToKeepP;
        exports2["default"] = deleteToKeepP;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        function tabHandler(editor, tabDownEvents) {
          function fn() {
            if (!editor.cmd.queryCommandSupported("insertHTML")) {
              return;
            }
            var $selectionElem = editor.selection.getSelectionContainerElem();
            if (!$selectionElem) {
              return;
            }
            var $parentElem = $selectionElem.parent();
            var selectionNodeName = $selectionElem.getNodeName();
            var parentNodeName = $parentElem.getNodeName();
            if (selectionNodeName == "CODE" || parentNodeName === "CODE" || parentNodeName === "PRE" || /hljs/.test(parentNodeName)) {
              editor.cmd["do"]("insertHTML", editor.config.languageTab);
            } else {
              editor.cmd["do"]("insertHTML", "&nbsp;&nbsp;&nbsp;&nbsp;");
            }
          }
          tabDownEvents.push(fn);
        }
        exports2["default"] = tabHandler;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _trim = _interopRequireDefault(__webpack_require__(17));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var paste_event_1 = __webpack_require__(131);
        var util_1 = __webpack_require__(6);
        var const_1 = __webpack_require__(7);
        function formatHtml(htmlText) {
          var _context;
          var paste = (0, _trim["default"])(_context = htmlText.replace(/<div>/gim, "<p>").replace(/<\/div>/gim, "</p>")).call(_context);
          var tempContainer = document.createElement("div");
          tempContainer.innerHTML = paste;
          return tempContainer.innerHTML.replace(/<p><\/p>/gim, "");
        }
        function formatCode(val) {
          var pasteText = val.replace(/<br>|<br\/>/gm, "\n").replace(/<[^>]+>/gm, "");
          return pasteText;
        }
        function isParagraphHtml(html) {
          var _a;
          if (html === "")
            return false;
          var container = document.createElement("div");
          container.innerHTML = html;
          return ((_a = container.firstChild) === null || _a === void 0 ? void 0 : _a.nodeName) === "P";
        }
        function isEmptyParagraph(topElem) {
          if (!(topElem === null || topElem === void 0 ? void 0 : topElem.length))
            return false;
          var dom = topElem.elems[0];
          return dom.nodeName === "P" && dom.innerHTML === "<br>";
        }
        function pasteTextHtml(editor, pasteEvents) {
          function fn(e) {
            var config = editor.config;
            var pasteFilterStyle = config.pasteFilterStyle;
            var pasteIgnoreImg = config.pasteIgnoreImg;
            var pasteTextHandle = config.pasteTextHandle;
            var pasteHtml = paste_event_1.getPasteHtml(e, pasteFilterStyle, pasteIgnoreImg);
            var pasteText = paste_event_1.getPasteText(e);
            pasteText = pasteText.replace(/\n/gm, "<br>");
            var $selectionElem = editor.selection.getSelectionContainerElem();
            if (!$selectionElem) {
              return;
            }
            var nodeName = $selectionElem === null || $selectionElem === void 0 ? void 0 : $selectionElem.getNodeName();
            var $topElem = $selectionElem === null || $selectionElem === void 0 ? void 0 : $selectionElem.getNodeTop(editor);
            var topNodeName = "";
            if ($topElem.elems[0]) {
              topNodeName = $topElem === null || $topElem === void 0 ? void 0 : $topElem.getNodeName();
            }
            if (nodeName === "CODE" || topNodeName === "PRE") {
              if (pasteTextHandle && util_1.isFunction(pasteTextHandle)) {
                pasteText = "" + (pasteTextHandle(pasteText) || "");
              }
              editor.cmd["do"]("insertHTML", formatCode(pasteText));
              return;
            }
            if (const_1.urlRegex.test(pasteText) && pasteFilterStyle) {
              if (pasteTextHandle && util_1.isFunction(pasteTextHandle)) {
                pasteText = "" + (pasteTextHandle(pasteText) || "");
              }
              var resultText = pasteText.replace(const_1.urlRegex, function(link) {
                return '<a href="' + link + '" target="_blank">' + link + "</a>";
              });
              var range = editor.selection.getRange();
              var div = document.createElement("div");
              var fragment = document.createDocumentFragment();
              div.innerHTML = resultText;
              if (range == null)
                return;
              while (div.childNodes.length) {
                fragment.append(div.childNodes[0]);
              }
              var linkEle = fragment.querySelectorAll("a");
              (0, _forEach["default"])(linkEle).call(linkEle, function(ele) {
                ele.innerText = ele.href;
              });
              if (range.insertNode) {
                range.deleteContents();
                range.insertNode(fragment);
              }
              editor.selection.clearWindowSelectionRange();
              return;
            }
            if (!pasteHtml) {
              return;
            }
            try {
              if (pasteTextHandle && util_1.isFunction(pasteTextHandle)) {
                pasteHtml = "" + (pasteTextHandle(pasteHtml) || "");
              }
              var isCssStyle = /[\.\#\@]?\w+[ ]+\{[^}]*\}/.test(pasteHtml);
              if (isCssStyle && pasteFilterStyle) {
                editor.cmd["do"]("insertHTML", "" + formatHtml(pasteText));
              } else {
                var html = formatHtml(pasteHtml);
                if (isParagraphHtml(html)) {
                  var $textEl = editor.$textElem;
                  editor.cmd["do"]("insertHTML", html);
                  if ($textEl.equal($selectionElem)) {
                    editor.selection.createEmptyRange();
                    return;
                  }
                  if (isEmptyParagraph($topElem)) {
                    $topElem.remove();
                  }
                } else {
                  editor.cmd["do"]("insertHTML", html);
                }
              }
            } catch (ex) {
              if (pasteTextHandle && util_1.isFunction(pasteTextHandle)) {
                pasteText = "" + (pasteTextHandle(pasteText) || "");
              }
              editor.cmd["do"]("insertHTML", "" + formatHtml(pasteText));
            }
          }
          pasteEvents.push(fn);
        }
        exports2["default"] = pasteTextHtml;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _trim = _interopRequireDefault(__webpack_require__(17));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _includes = _interopRequireDefault(__webpack_require__(28));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var tags_1 = __webpack_require__(293);
        var simplehtmlparser_js_1 = tslib_1.__importDefault(__webpack_require__(297));
        function filterEmptySpan(html) {
          var regForReplace = /<span>.*?<\/span>/gi;
          var regForMatch = /<span>(.*?)<\/span>/;
          return html.replace(regForReplace, function(s) {
            var result = s.match(regForMatch);
            if (result == null)
              return "";
            return result[1];
          });
        }
        function isIgnoreTag(tag, ignoreImg) {
          var _context;
          tag = (0, _trim["default"])(_context = tag.toLowerCase()).call(_context);
          if (tags_1.IGNORE_TAGS.has(tag)) {
            return true;
          }
          if (ignoreImg) {
            if (tag === "img") {
              return true;
            }
          }
          return false;
        }
        function genStartHtml(tag, attrs) {
          var result = "";
          result = "<" + tag;
          var attrStrArr = [];
          (0, _forEach["default"])(attrs).call(attrs, function(attr) {
            attrStrArr.push(attr.name + '="' + attr.value + '"');
          });
          if (attrStrArr.length > 0) {
            result = result + " " + attrStrArr.join(" ");
          }
          var isEmpty = tags_1.EMPTY_TAGS.has(tag);
          result = result + (isEmpty ? "/" : "") + ">";
          return result;
        }
        function genEndHtml(tag) {
          return "</" + tag + ">";
        }
        function parseHtml(html, filterStyle, ignoreImg) {
          if (filterStyle === void 0) {
            filterStyle = true;
          }
          if (ignoreImg === void 0) {
            ignoreImg = false;
          }
          var resultArr = [];
          var CUR_TAG = "";
          function markTagStart(tag) {
            tag = (0, _trim["default"])(tag).call(tag);
            if (!tag)
              return;
            if (tags_1.EMPTY_TAGS.has(tag))
              return;
            CUR_TAG = tag;
          }
          function markTagEnd() {
            CUR_TAG = "";
          }
          var htmlParser = new simplehtmlparser_js_1["default"]();
          htmlParser.parse(html, {
            startElement: function startElement(tag, attrs) {
              markTagStart(tag);
              if (isIgnoreTag(tag, ignoreImg)) {
                return;
              }
              var necessaryAttrKeys = tags_1.NECESSARY_ATTRS.get(tag) || [];
              var attrsForTag = [];
              (0, _forEach["default"])(attrs).call(attrs, function(attr) {
                var name = attr.name;
                if (name === "style") {
                  if (!filterStyle) {
                    attrsForTag.push(attr);
                  }
                  return;
                }
                if ((0, _includes["default"])(necessaryAttrKeys).call(necessaryAttrKeys, name) === false) {
                  return;
                }
                attrsForTag.push(attr);
              });
              var html2 = genStartHtml(tag, attrsForTag);
              resultArr.push(html2);
            },
            characters: function characters(str) {
              if (!str) {
                return;
              }
              if (isIgnoreTag(CUR_TAG, ignoreImg))
                return;
              resultArr.push(str);
            },
            endElement: function endElement(tag) {
              if (isIgnoreTag(tag, ignoreImg)) {
                return;
              }
              var html2 = genEndHtml(tag);
              resultArr.push(html2);
              markTagEnd();
            },
            comment: function comment(str) {
              markTagStart(str);
            }
          });
          var result = resultArr.join("");
          result = filterEmptySpan(result);
          return result;
        }
        exports2["default"] = parseHtml;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _set = _interopRequireDefault(__webpack_require__(132));
        var _map = _interopRequireDefault(__webpack_require__(121));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.TOP_LEVEL_TAGS = exports2.EMPTY_TAGS = exports2.NECESSARY_ATTRS = exports2.IGNORE_TAGS = void 0;
        exports2.IGNORE_TAGS = new _set["default"](["doctype", "!doctype", "html", "head", "meta", "body", "script", "style", "link", "frame", "iframe", "title", "svg", "center", "o:p"]);
        exports2.NECESSARY_ATTRS = new _map["default"]([["img", ["src", "alt"]], ["a", ["href", "target"]], ["td", ["colspan", "rowspan"]], ["th", ["colspan", "rowspan"]]]);
        exports2.EMPTY_TAGS = new _set["default"](["area", "base", "basefont", "br", "col", "hr", "img", "input", "isindex", "embed"]);
        exports2.TOP_LEVEL_TAGS = new _set["default"](["h1", "h2", "h3", "h4", "h5", "p", "ul", "ol", "table", "blockquote", "pre", "hr", "form"]);
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(295);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(296);
        __webpack_require__(61);
        __webpack_require__(50);
        __webpack_require__(54);
        var path = __webpack_require__(9);
        module2.exports = path.Set;
      },
      function(module2, exports2, __webpack_require__) {
        var collection = __webpack_require__(122);
        var collectionStrong = __webpack_require__(124);
        module2.exports = collection("Set", function(init) {
          return function Set2() {
            return init(this, arguments.length ? arguments[0] : void 0);
          };
        }, collectionStrong);
      },
      function(module2, exports2) {
        function SimpleHtmlParser() {
        }
        SimpleHtmlParser.prototype = {
          handler: null,
          startTagRe: /^<([^>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m,
          endTagRe: /^<\/([^>\s]+)[^>]*>/m,
          attrRe: /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm,
          parse: function(s, oHandler) {
            if (oHandler)
              this.contentHandler = oHandler;
            var lm, rc, index2;
            var treatAsChars = false;
            var oThis = this;
            while (s.length > 0) {
              if (s.substring(0, 4) == "<!--") {
                index2 = s.indexOf("-->");
                if (index2 != -1) {
                  this.contentHandler.comment(s.substring(4, index2));
                  s = s.substring(index2 + 3);
                  treatAsChars = false;
                } else {
                  treatAsChars = true;
                }
              } else if (s.substring(0, 2) == "</") {
                if (this.endTagRe.test(s)) {
                  lm = RegExp.lastMatch;
                  rc = RegExp.rightContext;
                  lm.replace(this.endTagRe, function() {
                    return oThis.parseEndTag.apply(oThis, arguments);
                  });
                  s = rc;
                  treatAsChars = false;
                } else {
                  treatAsChars = true;
                }
              } else if (s.charAt(0) == "<") {
                if (this.startTagRe.test(s)) {
                  lm = RegExp.lastMatch;
                  rc = RegExp.rightContext;
                  lm.replace(this.startTagRe, function() {
                    return oThis.parseStartTag.apply(oThis, arguments);
                  });
                  s = rc;
                  treatAsChars = false;
                } else {
                  treatAsChars = true;
                }
              }
              if (treatAsChars) {
                index2 = s.indexOf("<");
                if (index2 == -1) {
                  this.contentHandler.characters(s);
                  s = "";
                } else {
                  this.contentHandler.characters(s.substring(0, index2));
                  s = s.substring(index2);
                }
              }
              treatAsChars = true;
            }
          },
          parseStartTag: function(sTag, sTagName, sRest) {
            var attrs = this.parseAttributes(sTagName, sRest);
            this.contentHandler.startElement(sTagName, attrs);
          },
          parseEndTag: function(sTag, sTagName) {
            this.contentHandler.endElement(sTagName);
          },
          parseAttributes: function(sTagName, s) {
            var oThis = this;
            var attrs = [];
            s.replace(this.attrRe, function(a0, a1, a2, a3, a4, a5, a6, a7) {
              attrs.push(oThis.parseAttribute(sTagName, a0, a1, a2, a3, a4, a5, a6, a7));
            });
            return attrs;
          },
          parseAttribute: function(sTagName, sAttribute, sName) {
            var value = "";
            if (arguments[7])
              value = arguments[8];
            else if (arguments[5])
              value = arguments[6];
            else if (arguments[3])
              value = arguments[4];
            var empty = !value && !arguments[3];
            return { name: sName, value: empty ? null : value };
          }
        };
        module2.exports = SimpleHtmlParser;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        function imgClickActive(editor, imgClickEvents) {
          function clickFn($img) {
            editor.selection.createRangeByElem($img);
            editor.selection.restoreSelection();
          }
          imgClickEvents.push(clickFn);
        }
        exports2["default"] = imgClickActive;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var util_1 = __webpack_require__(6);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        function getChildrenJSON($elem) {
          var result = [];
          var $children = $elem.childNodes() || [];
          (0, _forEach["default"])($children).call($children, function(curElem) {
            var elemResult;
            var nodeType = curElem.nodeType;
            if (nodeType === 3) {
              elemResult = curElem.textContent || "";
              elemResult = util_1.replaceHtmlSymbol(elemResult);
            }
            if (nodeType === 1) {
              elemResult = {};
              elemResult = elemResult;
              elemResult.tag = curElem.nodeName.toLowerCase();
              var attrData = [];
              var attrList = curElem.attributes;
              var attrListLength = attrList.length || 0;
              for (var i = 0; i < attrListLength; i++) {
                var attr = attrList[i];
                attrData.push({
                  name: attr.name,
                  value: attr.value
                });
              }
              elemResult.attrs = attrData;
              elemResult.children = getChildrenJSON(dom_core_1["default"](curElem));
            }
            if (elemResult) {
              result.push(elemResult);
            }
          });
          return result;
        }
        exports2["default"] = getChildrenJSON;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _typeof2 = _interopRequireDefault(__webpack_require__(92));
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        function getHtmlByNodeList(nodeList, parent) {
          if (parent === void 0) {
            parent = document.createElement("div");
          }
          var root2 = parent;
          (0, _forEach["default"])(nodeList).call(nodeList, function(item) {
            var elem;
            if (typeof item === "string") {
              elem = document.createTextNode(item);
            }
            if ((0, _typeof2["default"])(item) === "object") {
              var _context;
              elem = document.createElement(item.tag);
              (0, _forEach["default"])(_context = item.attrs).call(_context, function(attr) {
                dom_core_1["default"](elem).attr(attr.name, attr.value);
              });
              if (item.children && item.children.length > 0) {
                getHtmlByNodeList(item.children, elem.getRootNode());
              }
            }
            elem && root2.appendChild(elem);
          });
          return dom_core_1["default"](root2);
        }
        exports2["default"] = getHtmlByNodeList;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _isArray = _interopRequireDefault(__webpack_require__(89));
        var _filter = _interopRequireDefault(__webpack_require__(70));
        var _includes = _interopRequireDefault(__webpack_require__(28));
        var _keys = _interopRequireDefault(__webpack_require__(302));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _entries = _interopRequireDefault(__webpack_require__(94));
        var _some = _interopRequireDefault(__webpack_require__(133));
        var _setTimeout2 = _interopRequireDefault(__webpack_require__(46));
        var _bind = _interopRequireDefault(__webpack_require__(57));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var index_1 = tslib_1.__importDefault(__webpack_require__(87));
        var menu_list_1 = tslib_1.__importDefault(__webpack_require__(314));
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var Menus = function() {
          function Menus2(editor) {
            this.editor = editor;
            this.menuList = [];
            this.constructorList = menu_list_1["default"];
          }
          Menus2.prototype.extend = function(key, Menu) {
            if (!Menu || typeof Menu !== "function")
              return;
            this.constructorList[key] = Menu;
          };
          Menus2.prototype.init = function() {
            var _context, _context2;
            var _this = this;
            var config = this.editor.config;
            var excludeMenus = config.excludeMenus;
            if ((0, _isArray["default"])(excludeMenus) === false)
              excludeMenus = [];
            config.menus = (0, _filter["default"])(_context = config.menus).call(_context, function(key) {
              return (0, _includes["default"])(excludeMenus).call(excludeMenus, key) === false;
            });
            var CustomMenuKeysList = (0, _keys["default"])(index_1["default"].globalCustomMenuConstructorList);
            CustomMenuKeysList = (0, _filter["default"])(CustomMenuKeysList).call(CustomMenuKeysList, function(key) {
              return (0, _includes["default"])(excludeMenus).call(excludeMenus, key);
            });
            (0, _forEach["default"])(CustomMenuKeysList).call(CustomMenuKeysList, function(key) {
              delete index_1["default"].globalCustomMenuConstructorList[key];
            });
            (0, _forEach["default"])(_context2 = config.menus).call(_context2, function(menuKey2) {
              var MenuConstructor2 = _this.constructorList[menuKey2];
              _this._initMenuList(menuKey2, MenuConstructor2);
            });
            for (var _i = 0, _a = (0, _entries["default"])(index_1["default"].globalCustomMenuConstructorList); _i < _a.length; _i++) {
              var _b = _a[_i], menuKey = _b[0], menuFun = _b[1];
              var MenuConstructor = menuFun;
              this._initMenuList(menuKey, MenuConstructor);
            }
            this._addToToolbar();
            if (config.showMenuTooltips) {
              this._bindMenuTooltips();
            }
          };
          Menus2.prototype._initMenuList = function(menuKey, MenuConstructor) {
            var _context3;
            if (MenuConstructor == null || typeof MenuConstructor !== "function") {
              return;
            }
            if ((0, _some["default"])(_context3 = this.menuList).call(_context3, function(menu) {
              return menu.key === menuKey;
            })) {
              console.warn("\u83DC\u5355\u540D\u79F0\u91CD\u590D:" + menuKey);
            } else {
              var m = new MenuConstructor(this.editor);
              m.key = menuKey;
              this.menuList.push(m);
            }
          };
          Menus2.prototype._bindMenuTooltips = function() {
            var editor = this.editor;
            var $toolbarElem = editor.$toolbarElem;
            var config = editor.config;
            var menuTooltipPosition = config.menuTooltipPosition;
            var $tooltipEl = dom_core_1["default"]('<div class="w-e-menu-tooltip w-e-menu-tooltip-' + menuTooltipPosition + '">\n            <div class="w-e-menu-tooltip-item-wrapper">\n              <div></div>\n            </div>\n          </div>');
            $tooltipEl.css("visibility", "hidden");
            $toolbarElem.append($tooltipEl);
            $tooltipEl.css("z-index", editor.zIndex.get("tooltip"));
            var showTimeoutId = 0;
            function clearShowTimeoutId() {
              if (showTimeoutId) {
                clearTimeout(showTimeoutId);
              }
            }
            function hide() {
              clearShowTimeoutId();
              $tooltipEl.css("visibility", "hidden");
            }
            $toolbarElem.on("mouseover", function(e) {
              var target = e.target;
              var $target = dom_core_1["default"](target);
              var title;
              var $menuEl;
              if ($target.isContain($toolbarElem)) {
                hide();
                return;
              }
              if ($target.parentUntil(".w-e-droplist") != null) {
                hide();
              } else {
                if ($target.attr("data-title")) {
                  title = $target.attr("data-title");
                  $menuEl = $target;
                } else {
                  var $parent = $target.parentUntil(".w-e-menu");
                  if ($parent != null) {
                    title = $parent.attr("data-title");
                    $menuEl = $parent;
                  }
                }
              }
              if (title && $menuEl) {
                clearShowTimeoutId();
                var targetOffset = $menuEl.getOffsetData();
                $tooltipEl.text(editor.i18next.t("menus.title." + title));
                var tooltipOffset = $tooltipEl.getOffsetData();
                var left = targetOffset.left + targetOffset.width / 2 - tooltipOffset.width / 2;
                $tooltipEl.css("left", left + "px");
                if (menuTooltipPosition === "up") {
                  $tooltipEl.css("top", targetOffset.top - tooltipOffset.height - 8 + "px");
                } else if (menuTooltipPosition === "down") {
                  $tooltipEl.css("top", targetOffset.top + targetOffset.height + 8 + "px");
                }
                showTimeoutId = (0, _setTimeout2["default"])(function() {
                  $tooltipEl.css("visibility", "visible");
                }, 200);
              } else {
                hide();
              }
            }).on("mouseleave", function() {
              hide();
            });
          };
          Menus2.prototype._addToToolbar = function() {
            var _context4;
            var editor = this.editor;
            var $toolbarElem = editor.$toolbarElem;
            (0, _forEach["default"])(_context4 = this.menuList).call(_context4, function(menu) {
              var $elem = menu.$elem;
              if ($elem) {
                $toolbarElem.append($elem);
              }
            });
          };
          Menus2.prototype.menuFind = function(key) {
            var menuList = this.menuList;
            for (var i = 0, l = menuList.length; i < l; i++) {
              if (menuList[i].key === key)
                return menuList[i];
            }
            return menuList[0];
          };
          Menus2.prototype.changeActive = function() {
            var _context5;
            (0, _forEach["default"])(_context5 = this.menuList).call(_context5, function(menu) {
              var _context6;
              (0, _setTimeout2["default"])((0, _bind["default"])(_context6 = menu.tryChangeActive).call(_context6, menu), 100);
            });
          };
          return Menus2;
        }();
        exports2["default"] = Menus;
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(303);
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(304);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(305);
        var path = __webpack_require__(9);
        module2.exports = path.Object.keys;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var toObject = __webpack_require__(31);
        var nativeKeys2 = __webpack_require__(52);
        var fails = __webpack_require__(11);
        var FAILS_ON_PRIMITIVES = fails(function() {
          nativeKeys2(1);
        });
        $({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES }, {
          keys: function keys2(it) {
            return nativeKeys2(toObject(it));
          }
        });
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(307);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(308);
        var path = __webpack_require__(9);
        module2.exports = path.Object.entries;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var $entries = __webpack_require__(309).entries;
        $({ target: "Object", stat: true }, {
          entries: function entries(O) {
            return $entries(O);
          }
        });
      },
      function(module2, exports2, __webpack_require__) {
        var DESCRIPTORS = __webpack_require__(14);
        var objectKeys = __webpack_require__(52);
        var toIndexedObject = __webpack_require__(30);
        var propertyIsEnumerable2 = __webpack_require__(59).f;
        var createMethod = function(TO_ENTRIES) {
          return function(it) {
            var O = toIndexedObject(it);
            var keys2 = objectKeys(O);
            var length = keys2.length;
            var i = 0;
            var result = [];
            var key;
            while (length > i) {
              key = keys2[i++];
              if (!DESCRIPTORS || propertyIsEnumerable2.call(O, key)) {
                result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
              }
            }
            return result;
          };
        };
        module2.exports = {
          entries: createMethod(true),
          values: createMethod(false)
        };
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(311);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        var some = __webpack_require__(312);
        var ArrayPrototype = Array.prototype;
        module2.exports = function(it) {
          var own = it.some;
          return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.some ? some : own;
        };
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(313);
        var entryVirtual = __webpack_require__(15);
        module2.exports = entryVirtual("Array").some;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var $some = __webpack_require__(32).some;
        var arrayMethodIsStrict = __webpack_require__(67);
        var arrayMethodUsesToLength = __webpack_require__(22);
        var STRICT_METHOD = arrayMethodIsStrict("some");
        var USES_TO_LENGTH = arrayMethodUsesToLength("some");
        $({ target: "Array", proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
          some: function some(callbackfn) {
            return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var index_1 = tslib_1.__importDefault(__webpack_require__(315));
        var index_2 = tslib_1.__importDefault(__webpack_require__(316));
        var index_3 = tslib_1.__importDefault(__webpack_require__(321));
        var index_4 = tslib_1.__importDefault(__webpack_require__(326));
        var index_5 = tslib_1.__importDefault(__webpack_require__(327));
        var index_6 = tslib_1.__importDefault(__webpack_require__(328));
        var index_7 = tslib_1.__importDefault(__webpack_require__(329));
        var font_size_1 = tslib_1.__importDefault(__webpack_require__(331));
        var index_8 = tslib_1.__importDefault(__webpack_require__(333));
        var index_9 = tslib_1.__importDefault(__webpack_require__(334));
        var index_10 = tslib_1.__importDefault(__webpack_require__(337));
        var index_11 = tslib_1.__importDefault(__webpack_require__(338));
        var index_12 = tslib_1.__importDefault(__webpack_require__(339));
        var index_13 = tslib_1.__importDefault(__webpack_require__(350));
        var index_14 = tslib_1.__importDefault(__webpack_require__(365));
        var index_15 = tslib_1.__importDefault(__webpack_require__(369));
        var index_16 = tslib_1.__importDefault(__webpack_require__(137));
        var index_17 = tslib_1.__importDefault(__webpack_require__(378));
        var index_18 = tslib_1.__importDefault(__webpack_require__(380));
        var index_19 = tslib_1.__importDefault(__webpack_require__(381));
        var index_20 = tslib_1.__importDefault(__webpack_require__(382));
        var code_1 = tslib_1.__importDefault(__webpack_require__(401));
        var index_21 = tslib_1.__importDefault(__webpack_require__(406));
        var todo_1 = tslib_1.__importDefault(__webpack_require__(409));
        exports2["default"] = {
          bold: index_1["default"],
          head: index_2["default"],
          italic: index_4["default"],
          link: index_3["default"],
          underline: index_5["default"],
          strikeThrough: index_6["default"],
          fontName: index_7["default"],
          fontSize: font_size_1["default"],
          justify: index_8["default"],
          quote: index_9["default"],
          backColor: index_10["default"],
          foreColor: index_11["default"],
          video: index_12["default"],
          image: index_13["default"],
          indent: index_14["default"],
          emoticon: index_15["default"],
          list: index_16["default"],
          lineHeight: index_17["default"],
          undo: index_18["default"],
          redo: index_19["default"],
          table: index_20["default"],
          code: code_1["default"],
          splitLine: index_21["default"],
          todo: todo_1["default"]
        };
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var BtnMenu_1 = tslib_1.__importDefault(__webpack_require__(23));
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var Bold = function(_super) {
          tslib_1.__extends(Bold2, _super);
          function Bold2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u52A0\u7C97">\n                <i class="w-e-icon-bold"></i>\n            </div>');
            _this = _super.call(this, $elem, editor) || this;
            return _this;
          }
          Bold2.prototype.clickHandler = function() {
            var editor = this.editor;
            var isSelectEmpty = editor.selection.isSelectionEmpty();
            if (isSelectEmpty) {
              editor.selection.createEmptyRange();
            }
            editor.cmd["do"]("bold");
            if (isSelectEmpty) {
              editor.selection.collapseRange();
              editor.selection.restoreSelection();
            }
          };
          Bold2.prototype.tryChangeActive = function() {
            var editor = this.editor;
            if (editor.cmd.queryCommandState("bold")) {
              this.active();
            } else {
              this.unActive();
            }
          };
          return Bold2;
        }(BtnMenu_1["default"]);
        exports2["default"] = Bold;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _indexOf = _interopRequireDefault(__webpack_require__(27));
        var _find = _interopRequireDefault(__webpack_require__(29));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _stringify = _interopRequireDefault(__webpack_require__(317));
        var _includes = _interopRequireDefault(__webpack_require__(28));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var DropListMenu_1 = tslib_1.__importDefault(__webpack_require__(24));
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var util_1 = __webpack_require__(6);
        var const_1 = __webpack_require__(7);
        var Head = function(_super) {
          tslib_1.__extends(Head2, _super);
          function Head2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u6807\u9898"><i class="w-e-icon-header"></i></div>');
            var dropListConf = {
              width: 100,
              title: "\u8BBE\u7F6E\u6807\u9898",
              type: "list",
              list: [{
                $elem: dom_core_1["default"]("<h1>H1</h1>"),
                value: "<h1>"
              }, {
                $elem: dom_core_1["default"]("<h2>H2</h2>"),
                value: "<h2>"
              }, {
                $elem: dom_core_1["default"]("<h3>H3</h3>"),
                value: "<h3>"
              }, {
                $elem: dom_core_1["default"]("<h4>H4</h4>"),
                value: "<h4>"
              }, {
                $elem: dom_core_1["default"]("<h5>H5</h5>"),
                value: "<h5>"
              }, {
                $elem: dom_core_1["default"]("<p>" + editor.i18next.t("menus.dropListMenu.head.\u6B63\u6587") + "</p>"),
                value: "<p>"
              }],
              clickHandler: function clickHandler(value) {
                _this.command(value);
              }
            };
            _this = _super.call(this, $elem, editor, dropListConf) || this;
            var onCatalogChange = editor.config.onCatalogChange;
            if (onCatalogChange) {
              _this.oldCatalogs = [];
              _this.addListenerCatalog();
              _this.getCatalogs();
            }
            return _this;
          }
          Head2.prototype.command = function(value) {
            var editor = this.editor;
            var $selectionElem = editor.selection.getSelectionContainerElem();
            if ($selectionElem && editor.$textElem.equal($selectionElem)) {
              this.setMultilineHead(value);
            } else {
              var _context;
              if ((0, _indexOf["default"])(_context = ["OL", "UL", "LI", "TABLE", "TH", "TR", "CODE", "HR"]).call(_context, dom_core_1["default"]($selectionElem).getNodeName()) > -1) {
                return;
              }
              editor.cmd["do"]("formatBlock", value);
            }
            value !== "<p>" && this.addUidForSelectionElem();
          };
          Head2.prototype.addUidForSelectionElem = function() {
            var editor = this.editor;
            var tag = editor.selection.getSelectionContainerElem();
            var id = util_1.getRandomCode();
            dom_core_1["default"](tag).attr("id", id);
          };
          Head2.prototype.addListenerCatalog = function() {
            var _this = this;
            var editor = this.editor;
            editor.txt.eventHooks.changeEvents.push(function() {
              _this.getCatalogs();
            });
          };
          Head2.prototype.getCatalogs = function() {
            var editor = this.editor;
            var $textElem = this.editor.$textElem;
            var onCatalogChange = editor.config.onCatalogChange;
            var elems = (0, _find["default"])($textElem).call($textElem, "h1,h2,h3,h4,h5");
            var catalogs = [];
            (0, _forEach["default"])(elems).call(elems, function(elem, index2) {
              var $elem = dom_core_1["default"](elem);
              var id = $elem.attr("id");
              var tag = $elem.getNodeName();
              var text = $elem.text();
              if (!id) {
                id = util_1.getRandomCode();
                $elem.attr("id", id);
              }
              if (!text)
                return;
              catalogs.push({
                tag,
                id,
                text
              });
            });
            if ((0, _stringify["default"])(this.oldCatalogs) !== (0, _stringify["default"])(catalogs)) {
              this.oldCatalogs = catalogs;
              onCatalogChange && onCatalogChange(catalogs);
            }
          };
          Head2.prototype.setMultilineHead = function(value) {
            var _this = this;
            var _a, _b;
            var editor = this.editor;
            var $selection = editor.selection;
            var containerElem = (_a = $selection.getSelectionContainerElem()) === null || _a === void 0 ? void 0 : _a.elems[0];
            var _WHITE_LIST = ["IMG", "VIDEO", "TABLE", "TH", "TR", "UL", "OL", "PRE", "HR", "BLOCKQUOTE"];
            var startElem = dom_core_1["default"]($selection.getSelectionStartElem());
            var endElem = dom_core_1["default"]($selection.getSelectionEndElem());
            if (endElem.elems[0].outerHTML === dom_core_1["default"](const_1.EMPTY_P).elems[0].outerHTML && !endElem.elems[0].nextSibling) {
              endElem = endElem.prev();
            }
            var cacheDomList = [];
            cacheDomList.push(startElem.getNodeTop(editor));
            var indexList = [];
            var childList = (_b = $selection.getRange()) === null || _b === void 0 ? void 0 : _b.commonAncestorContainer.childNodes;
            childList === null || childList === void 0 ? void 0 : (0, _forEach["default"])(childList).call(childList, function(item, index2) {
              if (item === cacheDomList[0].getNode()) {
                indexList.push(index2);
              }
              if (item === endElem.getNodeTop(editor).getNode()) {
                indexList.push(index2);
              }
            });
            var i = 0;
            while (cacheDomList[i].getNode() !== endElem.getNodeTop(editor).getNode()) {
              if (!cacheDomList[i].elems[0])
                return;
              var d = dom_core_1["default"](cacheDomList[i].next().getNode());
              cacheDomList.push(d);
              i++;
            }
            cacheDomList === null || cacheDomList === void 0 ? void 0 : (0, _forEach["default"])(cacheDomList).call(cacheDomList, function(_node, index2) {
              if (!_this.hasTag(_node, _WHITE_LIST)) {
                var $h = dom_core_1["default"](value);
                var $parentNode = _node.parent().getNode();
                $h.html("" + _node.html());
                $parentNode.insertBefore($h.getNode(), _node.getNode());
                _node.remove();
              }
            });
            $selection.createRangeByElems(containerElem.children[indexList[0]], containerElem.children[indexList[1]]);
          };
          Head2.prototype.hasTag = function(elem, whiteList) {
            var _this = this;
            var _a;
            if (!elem)
              return false;
            if ((0, _includes["default"])(whiteList).call(whiteList, elem === null || elem === void 0 ? void 0 : elem.getNodeName()))
              return true;
            var _flag = false;
            (_a = elem.children()) === null || _a === void 0 ? void 0 : (0, _forEach["default"])(_a).call(_a, function(child) {
              _flag = _this.hasTag(dom_core_1["default"](child), whiteList);
            });
            return _flag;
          };
          Head2.prototype.tryChangeActive = function() {
            var editor = this.editor;
            var reg = /^h/i;
            var cmdValue = editor.cmd.queryCommandValue("formatBlock");
            if (reg.test(cmdValue)) {
              this.active();
            } else {
              this.unActive();
            }
          };
          return Head2;
        }(DropListMenu_1["default"]);
        exports2["default"] = Head;
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(318);
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(319);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(320);
        var core = __webpack_require__(9);
        if (!core.JSON)
          core.JSON = { stringify: JSON.stringify };
        module2.exports = function stringify(it, replacer, space) {
          return core.JSON.stringify.apply(null, arguments);
        };
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var getBuiltIn = __webpack_require__(36);
        var fails = __webpack_require__(11);
        var $stringify = getBuiltIn("JSON", "stringify");
        var re = /[\uD800-\uDFFF]/g;
        var low = /^[\uD800-\uDBFF]$/;
        var hi = /^[\uDC00-\uDFFF]$/;
        var fix = function(match, offset, string) {
          var prev = string.charAt(offset - 1);
          var next = string.charAt(offset + 1);
          if (low.test(match) && !hi.test(next) || hi.test(match) && !low.test(prev)) {
            return "\\u" + match.charCodeAt(0).toString(16);
          }
          return match;
        };
        var FORCED = fails(function() {
          return $stringify("\uDF06\uD834") !== '"\\udf06\\ud834"' || $stringify("\uDEAD") !== '"\\udead"';
        });
        if ($stringify) {
          $({ target: "JSON", stat: true, forced: FORCED }, {
            stringify: function stringify(it, replacer, space) {
              var result = $stringify.apply(null, arguments);
              return typeof result == "string" ? result.replace(re, fix) : result;
            }
          });
        }
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _trim = _interopRequireDefault(__webpack_require__(17));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var PanelMenu_1 = tslib_1.__importDefault(__webpack_require__(38));
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var create_panel_conf_1 = tslib_1.__importDefault(__webpack_require__(322));
        var is_active_1 = tslib_1.__importStar(__webpack_require__(96));
        var Panel_1 = tslib_1.__importDefault(__webpack_require__(33));
        var index_1 = tslib_1.__importDefault(__webpack_require__(324));
        var const_1 = __webpack_require__(7);
        var Link = function(_super) {
          tslib_1.__extends(Link2, _super);
          function Link2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u94FE\u63A5"><i class="w-e-icon-link"></i></div>');
            _this = _super.call(this, $elem, editor) || this;
            index_1["default"](editor);
            return _this;
          }
          Link2.prototype.clickHandler = function() {
            var editor = this.editor;
            var $linkElem;
            var $selectionElem = editor.selection.getSelectionContainerElem();
            var $textElem = editor.$textElem;
            var html = $textElem.html();
            var $txtHtml = (0, _trim["default"])(html).call(html);
            if ($txtHtml === const_1.EMPTY_P) {
              var $emptyChild = $textElem.children();
              editor.selection.createRangeByElem($emptyChild, true, true);
              $selectionElem = editor.selection.getSelectionContainerElem();
            }
            if ($selectionElem && editor.$textElem.equal($selectionElem)) {
              return;
            }
            if (this.isActive) {
              var text = "";
              var href = "";
              $linkElem = editor.selection.getSelectionContainerElem();
              if (!$linkElem) {
                return;
              }
              if ($linkElem.getNodeName() !== "A") {
                var parentNodeA = is_active_1.getParentNodeA($linkElem);
                $linkElem = dom_core_1["default"](parentNodeA);
              }
              text = $linkElem.elems[0].innerText;
              href = $linkElem.attr("href");
              this.createPanel(text, href);
            } else {
              if (editor.selection.isSelectionEmpty()) {
                this.createPanel("", "");
              } else {
                this.createPanel(editor.selection.getSelectionText(), "");
              }
            }
          };
          Link2.prototype.createPanel = function(text, link) {
            var conf = create_panel_conf_1["default"](this.editor, text, link);
            var panel = new Panel_1["default"](this, conf);
            panel.create();
          };
          Link2.prototype.tryChangeActive = function() {
            var editor = this.editor;
            if (is_active_1["default"](editor)) {
              this.active();
            } else {
              this.unActive();
            }
          };
          return Link2;
        }(PanelMenu_1["default"]);
        exports2["default"] = Link;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _includes = _interopRequireDefault(__webpack_require__(28));
        var _trim = _interopRequireDefault(__webpack_require__(17));
        var _find = _interopRequireDefault(__webpack_require__(29));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var util_1 = __webpack_require__(6);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var is_active_1 = tslib_1.__importStar(__webpack_require__(96));
        var util_2 = __webpack_require__(323);
        function default_1(editor, text, link) {
          var inputLinkId = util_1.getRandom("input-link");
          var inputTextId = util_1.getRandom("input-text");
          var btnOkId = util_1.getRandom("btn-ok");
          var btnDelId = util_1.getRandom("btn-del");
          var delBtnDisplay = is_active_1["default"](editor) ? "inline-block" : "none";
          var $selectedLink;
          function selectLinkElem() {
            if (!is_active_1["default"](editor))
              return;
            var $linkElem = editor.selection.getSelectionContainerElem();
            if (!$linkElem)
              return;
            editor.selection.createRangeByElem($linkElem);
            editor.selection.restoreSelection();
            $selectedLink = $linkElem;
          }
          function insertLink(text2, link2) {
            var resultText = text2.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            var $elem = dom_core_1["default"]('<a target="_blank">' + resultText + "</a>");
            var linkDom = $elem.elems[0];
            linkDom.innerText = text2;
            linkDom.href = link2;
            if (is_active_1["default"](editor)) {
              selectLinkElem();
              editor.cmd["do"]("insertElem", $elem);
            } else {
              editor.cmd["do"]("insertElem", $elem);
            }
          }
          function delLink() {
            if (!is_active_1["default"](editor)) {
              return;
            }
            selectLinkElem();
            if ($selectedLink.getNodeName() === "A") {
              var _context;
              var linkElem = $selectedLink.elems[0];
              var linkParentNode = linkElem.parentElement;
              if (linkParentNode && (0, _includes["default"])(_context = is_active_1.EXTRA_TAG).call(_context, linkParentNode.nodeName)) {
                linkParentNode.innerHTML = linkElem.innerHTML;
              } else {
                editor.cmd["do"]("insertHTML", "<span>" + linkElem.innerHTML + "</span>");
              }
            } else {
              var parentNodeA = is_active_1.getParentNodeA($selectedLink);
              var selectionContent = parentNodeA.innerHTML;
              editor.cmd["do"]("insertHTML", "<span>" + selectionContent + "</span>");
            }
          }
          function checkLink(text2, link2) {
            var check = editor.config.linkCheck(text2, link2);
            if (check === void 0)
              ;
            else if (check === true) {
              return true;
            } else {
              editor.config.customAlert(check, "warning");
            }
            return false;
          }
          var conf = {
            width: 300,
            height: 0,
            tabs: [{
              title: editor.i18next.t("menus.panelMenus.link.\u94FE\u63A5"),
              tpl: '<div>\n                        <input\n                            id="' + inputTextId + '"\n                            type="text"\n                            class="block"\n                            placeholder="' + editor.i18next.t("menus.panelMenus.link.\u94FE\u63A5\u6587\u5B57") + '"/>\n                        </td>\n                        <input\n                            id="' + inputLinkId + '"\n                            type="text"\n                            class="block"\n                            placeholder="' + editor.i18next.t("\u5982") + ' https://..."/>\n                        </td>\n                        <div class="w-e-button-container">\n                            <button type="button" id="' + btnOkId + '" class="right">\n                                ' + editor.i18next.t("\u63D2\u5165") + '\n                            </button>\n                            <button type="button" id="' + btnDelId + '" class="gray right" style="display:' + delBtnDisplay + '">\n                                ' + editor.i18next.t("menus.panelMenus.link.\u53D6\u6D88\u94FE\u63A5") + "\n                            </button>\n                        </div>\n                    </div>",
              events: [
                {
                  selector: "#" + btnOkId,
                  type: "click",
                  fn: function fn() {
                    var _context2, _context3, _context4;
                    var _a, _b;
                    var $selectionContainerElem = editor.selection.getSelectionContainerElem();
                    var $elem = $selectionContainerElem === null || $selectionContainerElem === void 0 ? void 0 : $selectionContainerElem.elems[0];
                    editor.selection.restoreSelection();
                    var topNode = editor.selection.getSelectionRangeTopNodes()[0].getNode();
                    var selection = window.getSelection();
                    var $link = dom_core_1["default"]("#" + inputLinkId);
                    var $text = dom_core_1["default"]("#" + inputTextId);
                    var link2 = (0, _trim["default"])(_context2 = $link.val()).call(_context2);
                    var text2 = (0, _trim["default"])(_context3 = $text.val()).call(_context3);
                    var html = "";
                    if (selection && !(selection === null || selection === void 0 ? void 0 : selection.isCollapsed)) {
                      html = (_a = util_2.insertHtml(selection, topNode)) === null || _a === void 0 ? void 0 : (0, _trim["default"])(_a).call(_a);
                    }
                    var htmlText = html === null || html === void 0 ? void 0 : html.replace(/<.*?>/g, "");
                    var htmlTextLen = (_b = htmlText === null || htmlText === void 0 ? void 0 : htmlText.length) !== null && _b !== void 0 ? _b : 0;
                    if (htmlTextLen <= text2.length) {
                      var startText = text2.substring(0, htmlTextLen);
                      var endText = text2.substring(htmlTextLen);
                      if (htmlText === startText) {
                        text2 = htmlText + endText;
                      }
                    }
                    if (!link2)
                      return;
                    if (!text2)
                      text2 = link2;
                    if (!checkLink(text2, link2))
                      return;
                    if (($elem === null || $elem === void 0 ? void 0 : $elem.nodeName) === "A") {
                      $elem.setAttribute("href", link2);
                      $elem.innerText = text2;
                      return true;
                    }
                    if (($elem === null || $elem === void 0 ? void 0 : $elem.nodeName) !== "A" && (0, _includes["default"])(_context4 = is_active_1.EXTRA_TAG).call(_context4, $elem.nodeName)) {
                      var nodeA = is_active_1.getParentNodeA($selectionContainerElem);
                      if (nodeA) {
                        nodeA.setAttribute("href", link2);
                        $elem.innerText = text2;
                        return true;
                      }
                    }
                    insertLink(text2, link2);
                    return true;
                  },
                  bindEnter: true
                },
                {
                  selector: "#" + btnDelId,
                  type: "click",
                  fn: function fn() {
                    delLink();
                    return true;
                  }
                }
              ]
            }],
            setLinkValue: function setLinkValue($container, type) {
              var inputId = "";
              var inputValue = "";
              var inputDom;
              if (type === "text") {
                inputId = "#" + inputTextId;
                inputValue = text;
              }
              if (type === "link") {
                inputId = "#" + inputLinkId;
                inputValue = link;
              }
              inputDom = (0, _find["default"])($container).call($container, inputId).elems[0];
              inputDom.value = inputValue;
            }
          };
          return conf;
        }
        exports2["default"] = default_1;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.insertHtml = exports2.createPartHtml = exports2.makeHtmlString = exports2.getTopNode = void 0;
        function getTopNode(node, topText) {
          var pointerNode = node;
          var topNode = node;
          do {
            if (pointerNode.textContent === topText)
              break;
            topNode = pointerNode;
            if (pointerNode.parentNode) {
              pointerNode = pointerNode === null || pointerNode === void 0 ? void 0 : pointerNode.parentNode;
            }
          } while ((pointerNode === null || pointerNode === void 0 ? void 0 : pointerNode.nodeName) !== "P");
          return topNode;
        }
        exports2.getTopNode = getTopNode;
        function makeHtmlString(node, content) {
          var tagName = node.nodeName;
          var attr = "";
          if (node.nodeType === 3 || /^(h|H)[1-6]$/.test(tagName)) {
            return content;
          }
          if (node.nodeType === 1) {
            var style = node.getAttribute("style");
            var face = node.getAttribute("face");
            var color = node.getAttribute("color");
            if (style)
              attr = attr + (' style="' + style + '"');
            if (face)
              attr = attr + (' face="' + face + '"');
            if (color)
              attr = attr + (' color="' + color + '"');
          }
          tagName = tagName.toLowerCase();
          return "<" + tagName + attr + ">" + content + "</" + tagName + ">";
        }
        exports2.makeHtmlString = makeHtmlString;
        function createPartHtml(topText, node, startPos, endPost) {
          var _a;
          var selectionContent = (_a = node.textContent) === null || _a === void 0 ? void 0 : _a.substring(startPos, endPost);
          var pointerNode = node;
          var content = "";
          do {
            content = makeHtmlString(pointerNode, selectionContent !== null && selectionContent !== void 0 ? selectionContent : "");
            selectionContent = content;
            pointerNode = pointerNode === null || pointerNode === void 0 ? void 0 : pointerNode.parentElement;
          } while (pointerNode && pointerNode.textContent !== topText);
          return content;
        }
        exports2.createPartHtml = createPartHtml;
        function insertHtml(selection, topNode) {
          var _a, _b, _c, _d, _e;
          var anchorNode = selection.anchorNode, focusNode = selection.focusNode, anchorPos = selection.anchorOffset, focusPos = selection.focusOffset;
          var topText = (_a = topNode.textContent) !== null && _a !== void 0 ? _a : "";
          var TagArr = getContainerTag(topNode);
          var content = "";
          var startContent = "";
          var middleContent = "";
          var endContent = "";
          var startNode = anchorNode;
          var endNode = focusNode;
          var pointerNode = anchorNode;
          if (anchorNode === null || anchorNode === void 0 ? void 0 : anchorNode.isEqualNode(focusNode !== null && focusNode !== void 0 ? focusNode : null)) {
            var innerContent = createPartHtml(topText, anchorNode, anchorPos, focusPos);
            innerContent = addContainer(TagArr, innerContent);
            return innerContent;
          }
          if (anchorNode)
            startContent = createPartHtml(topText, anchorNode, anchorPos !== null && anchorPos !== void 0 ? anchorPos : 0);
          if (focusNode)
            endContent = createPartHtml(topText, focusNode, 0, focusPos);
          if (anchorNode) {
            startNode = getTopNode(anchorNode, topText);
          }
          if (focusNode) {
            endNode = getTopNode(focusNode, topText);
          }
          pointerNode = (_b = startNode === null || startNode === void 0 ? void 0 : startNode.nextSibling) !== null && _b !== void 0 ? _b : anchorNode;
          while (!(pointerNode === null || pointerNode === void 0 ? void 0 : pointerNode.isEqualNode(endNode !== null && endNode !== void 0 ? endNode : null))) {
            var pointerNodeName = pointerNode === null || pointerNode === void 0 ? void 0 : pointerNode.nodeName;
            if (pointerNodeName === "#text") {
              middleContent = middleContent + (pointerNode === null || pointerNode === void 0 ? void 0 : pointerNode.textContent);
            } else {
              var htmlString = (_d = (_c = pointerNode === null || pointerNode === void 0 ? void 0 : pointerNode.firstChild) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.innerHTML;
              if (pointerNode)
                middleContent = middleContent + makeHtmlString(pointerNode, htmlString !== null && htmlString !== void 0 ? htmlString : "");
            }
            var nextPointNode = (_e = pointerNode === null || pointerNode === void 0 ? void 0 : pointerNode.nextSibling) !== null && _e !== void 0 ? _e : pointerNode;
            if (nextPointNode === pointerNode)
              break;
            pointerNode = nextPointNode;
          }
          content = "" + startContent + middleContent + endContent;
          content = addContainer(TagArr, content);
          return content;
        }
        exports2.insertHtml = insertHtml;
        function getContainerTag(node) {
          var _a;
          var topText = (_a = node.textContent) !== null && _a !== void 0 ? _a : "";
          var tagArr = [];
          while ((node === null || node === void 0 ? void 0 : node.textContent) === topText) {
            if (node.nodeName !== "P" && node.nodeName !== "TABLE") {
              tagArr.push(node);
            }
            node = node.childNodes[0];
          }
          return tagArr;
        }
        function addContainer(tagArr, content) {
          (0, _forEach["default"])(tagArr).call(tagArr, function(v) {
            content = makeHtmlString(v, content);
          });
          return content;
        }
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var tooltip_event_1 = tslib_1.__importDefault(__webpack_require__(325));
        function bindEvent(editor) {
          tooltip_event_1["default"](editor);
        }
        exports2["default"] = bindEvent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _includes = _interopRequireDefault(__webpack_require__(28));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var Tooltip_1 = tslib_1.__importDefault(__webpack_require__(39));
        var is_active_1 = __webpack_require__(96);
        function createShowHideFn(editor) {
          var tooltip;
          function showLinkTooltip($link) {
            var conf = [{
              $elem: dom_core_1["default"]("<span>" + editor.i18next.t("menus.panelMenus.link.\u67E5\u770B\u94FE\u63A5") + "</span>"),
              onClick: function onClick(editor2, $link2) {
                var link = $link2.attr("href");
                window.open(link, "_target");
                return true;
              }
            }, {
              $elem: dom_core_1["default"]("<span>" + editor.i18next.t("menus.panelMenus.link.\u53D6\u6D88\u94FE\u63A5") + "</span>"),
              onClick: function onClick(editor2, $link2) {
                var _a, _b;
                editor2.selection.createRangeByElem($link2);
                editor2.selection.restoreSelection();
                var $childNodes = $link2.childNodes();
                if (($childNodes === null || $childNodes === void 0 ? void 0 : $childNodes.getNodeName()) === "IMG") {
                  var $selectIMG = (_b = (_a = editor2.selection.getSelectionContainerElem()) === null || _a === void 0 ? void 0 : _a.children()) === null || _b === void 0 ? void 0 : _b.elems[0].children[0];
                  editor2.cmd["do"]("insertHTML", "<img \n                                src=" + ($selectIMG === null || $selectIMG === void 0 ? void 0 : $selectIMG.getAttribute("src")) + " \n                                style=" + ($selectIMG === null || $selectIMG === void 0 ? void 0 : $selectIMG.getAttribute("style")) + ">");
                } else {
                  var _context;
                  var linkElem = $link2.elems[0];
                  var selectionContent = linkElem.innerHTML;
                  var linkParentNode = linkElem.parentElement;
                  if (linkParentNode && (0, _includes["default"])(_context = is_active_1.EXTRA_TAG).call(_context, linkParentNode.nodeName)) {
                    linkParentNode.innerHTML = selectionContent;
                  } else {
                    editor2.cmd["do"]("insertHTML", "<span>" + selectionContent + "</span>");
                  }
                }
                return true;
              }
            }];
            tooltip = new Tooltip_1["default"](editor, $link, conf);
            tooltip.create();
          }
          function hideLinkTooltip() {
            if (tooltip) {
              tooltip.remove();
              tooltip = null;
            }
          }
          return {
            showLinkTooltip,
            hideLinkTooltip
          };
        }
        function bindTooltipEvent(editor) {
          var _a = createShowHideFn(editor), showLinkTooltip = _a.showLinkTooltip, hideLinkTooltip = _a.hideLinkTooltip;
          editor.txt.eventHooks.linkClickEvents.push(showLinkTooltip);
          editor.txt.eventHooks.clickEvents.push(hideLinkTooltip);
          editor.txt.eventHooks.keyupEvents.push(hideLinkTooltip);
          editor.txt.eventHooks.toolbarClickEvents.push(hideLinkTooltip);
          editor.txt.eventHooks.menuClickEvents.push(hideLinkTooltip);
          editor.txt.eventHooks.textScrollEvents.push(hideLinkTooltip);
        }
        exports2["default"] = bindTooltipEvent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var BtnMenu_1 = tslib_1.__importDefault(__webpack_require__(23));
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var Italic = function(_super) {
          tslib_1.__extends(Italic2, _super);
          function Italic2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u659C\u4F53">\n                <i class="w-e-icon-italic"></i>\n            </div>');
            _this = _super.call(this, $elem, editor) || this;
            return _this;
          }
          Italic2.prototype.clickHandler = function() {
            var editor = this.editor;
            var isSelectEmpty = editor.selection.isSelectionEmpty();
            if (isSelectEmpty) {
              editor.selection.createEmptyRange();
            }
            editor.cmd["do"]("italic");
            if (isSelectEmpty) {
              editor.selection.collapseRange();
              editor.selection.restoreSelection();
            }
          };
          Italic2.prototype.tryChangeActive = function() {
            var editor = this.editor;
            if (editor.cmd.queryCommandState("italic")) {
              this.active();
            } else {
              this.unActive();
            }
          };
          return Italic2;
        }(BtnMenu_1["default"]);
        exports2["default"] = Italic;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var BtnMenu_1 = tslib_1.__importDefault(__webpack_require__(23));
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var Underline = function(_super) {
          tslib_1.__extends(Underline2, _super);
          function Underline2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u4E0B\u5212\u7EBF">\n                <i class="w-e-icon-underline"></i>\n            </div>');
            _this = _super.call(this, $elem, editor) || this;
            return _this;
          }
          Underline2.prototype.clickHandler = function() {
            var editor = this.editor;
            var isSelectEmpty = editor.selection.isSelectionEmpty();
            if (isSelectEmpty) {
              editor.selection.createEmptyRange();
            }
            editor.cmd["do"]("underline");
            if (isSelectEmpty) {
              editor.selection.collapseRange();
              editor.selection.restoreSelection();
            }
          };
          Underline2.prototype.tryChangeActive = function() {
            var editor = this.editor;
            if (editor.cmd.queryCommandState("underline")) {
              this.active();
            } else {
              this.unActive();
            }
          };
          return Underline2;
        }(BtnMenu_1["default"]);
        exports2["default"] = Underline;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var BtnMenu_1 = tslib_1.__importDefault(__webpack_require__(23));
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var StrikeThrough = function(_super) {
          tslib_1.__extends(StrikeThrough2, _super);
          function StrikeThrough2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u5220\u9664\u7EBF">\n                <i class="w-e-icon-strikethrough"></i>\n            </div>');
            _this = _super.call(this, $elem, editor) || this;
            return _this;
          }
          StrikeThrough2.prototype.clickHandler = function() {
            var editor = this.editor;
            var isSelectEmpty = editor.selection.isSelectionEmpty();
            if (isSelectEmpty) {
              editor.selection.createEmptyRange();
            }
            editor.cmd["do"]("strikeThrough");
            if (isSelectEmpty) {
              editor.selection.collapseRange();
              editor.selection.restoreSelection();
            }
          };
          StrikeThrough2.prototype.tryChangeActive = function() {
            var editor = this.editor;
            if (editor.cmd.queryCommandState("strikeThrough")) {
              this.active();
            } else {
              this.unActive();
            }
          };
          return StrikeThrough2;
        }(BtnMenu_1["default"]);
        exports2["default"] = StrikeThrough;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var DropListMenu_1 = tslib_1.__importDefault(__webpack_require__(24));
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var FontStyleList_1 = tslib_1.__importDefault(__webpack_require__(330));
        var FontStyle = function(_super) {
          tslib_1.__extends(FontStyle2, _super);
          function FontStyle2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u5B57\u4F53">\n                <i class="w-e-icon-font"></i>\n            </div>');
            var fontStyleList = new FontStyleList_1["default"](editor.config.fontNames);
            var fontListConf = {
              width: 100,
              title: "\u8BBE\u7F6E\u5B57\u4F53",
              type: "list",
              list: fontStyleList.getItemList(),
              clickHandler: function clickHandler(value) {
                _this.command(value);
              }
            };
            _this = _super.call(this, $elem, editor, fontListConf) || this;
            return _this;
          }
          FontStyle2.prototype.command = function(value) {
            var _a;
            var editor = this.editor;
            var isEmptySelection = editor.selection.isSelectionEmpty();
            var $selectionElem = (_a = editor.selection.getSelectionContainerElem()) === null || _a === void 0 ? void 0 : _a.elems[0];
            if ($selectionElem == null)
              return;
            var isFont = ($selectionElem === null || $selectionElem === void 0 ? void 0 : $selectionElem.nodeName.toLowerCase()) !== "p";
            var isSameValue = ($selectionElem === null || $selectionElem === void 0 ? void 0 : $selectionElem.getAttribute("face")) === value;
            if (isEmptySelection) {
              if (isFont && !isSameValue) {
                var $elems = editor.selection.getSelectionRangeTopNodes();
                editor.selection.createRangeByElem($elems[0]);
                editor.selection.moveCursor($elems[0].elems[0]);
              }
              editor.selection.setRangeToElem($selectionElem);
              editor.selection.createEmptyRange();
            }
            editor.cmd["do"]("fontName", value);
            if (isEmptySelection) {
              editor.selection.collapseRange();
              editor.selection.restoreSelection();
            }
          };
          FontStyle2.prototype.tryChangeActive = function() {
          };
          return FontStyle2;
        }(DropListMenu_1["default"]);
        exports2["default"] = FontStyle;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var FontStyleList = function() {
          function FontStyleList2(list) {
            var _this = this;
            this.itemList = [];
            (0, _forEach["default"])(list).call(list, function(fontValue) {
              var fontFamily = typeof fontValue === "string" ? fontValue : fontValue.value;
              var fontName = typeof fontValue === "string" ? fontValue : fontValue.name;
              _this.itemList.push({
                $elem: dom_core_1["default"](`<p style="font-family:'` + fontFamily + `'">` + fontName + "</p>"),
                value: fontName
              });
            });
          }
          FontStyleList2.prototype.getItemList = function() {
            return this.itemList;
          };
          return FontStyleList2;
        }();
        exports2["default"] = FontStyleList;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var DropListMenu_1 = tslib_1.__importDefault(__webpack_require__(24));
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var FontSizeList_1 = tslib_1.__importDefault(__webpack_require__(332));
        var FontSize = function(_super) {
          tslib_1.__extends(FontSize2, _super);
          function FontSize2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u5B57\u53F7">\n                <i class="w-e-icon-text-heigh"></i>\n            </div>');
            var fontStyleList = new FontSizeList_1["default"](editor.config.fontSizes);
            var fontListConf = {
              width: 160,
              title: "\u8BBE\u7F6E\u5B57\u53F7",
              type: "list",
              list: fontStyleList.getItemList(),
              clickHandler: function clickHandler(value) {
                _this.command(value);
              }
            };
            _this = _super.call(this, $elem, editor, fontListConf) || this;
            return _this;
          }
          FontSize2.prototype.command = function(value) {
            var _a;
            var editor = this.editor;
            var isEmptySelection = editor.selection.isSelectionEmpty();
            var selectionElem = (_a = editor.selection.getSelectionContainerElem()) === null || _a === void 0 ? void 0 : _a.elems[0];
            if (selectionElem == null)
              return;
            editor.cmd["do"]("fontSize", value);
            if (isEmptySelection) {
              editor.selection.collapseRange();
              editor.selection.restoreSelection();
            }
          };
          FontSize2.prototype.tryChangeActive = function() {
          };
          return FontSize2;
        }(DropListMenu_1["default"]);
        exports2["default"] = FontSize;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var FontSizeList = function() {
          function FontSizeList2(list) {
            this.itemList = [];
            for (var key in list) {
              var item = list[key];
              this.itemList.push({
                $elem: dom_core_1["default"]('<p style="font-size:' + key + '">' + item.name + "</p>"),
                value: item.value
              });
            }
          }
          FontSizeList2.prototype.getItemList = function() {
            return this.itemList;
          };
          return FontSizeList2;
        }();
        exports2["default"] = FontSizeList;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _indexOf = _interopRequireDefault(__webpack_require__(27));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var DropListMenu_1 = tslib_1.__importDefault(__webpack_require__(24));
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var SPECIAL_NODE_LIST = ["LI"];
        var SPECIAL_TOP_NODE_LIST = ["BLOCKQUOTE"];
        var Justify = function(_super) {
          tslib_1.__extends(Justify2, _super);
          function Justify2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u5BF9\u9F50"><i class="w-e-icon-paragraph-left"></i></div>');
            var dropListConf = {
              width: 100,
              title: "\u5BF9\u9F50\u65B9\u5F0F",
              type: "list",
              list: [{
                $elem: dom_core_1["default"]('<p>\n                            <i class="w-e-icon-paragraph-left w-e-drop-list-item"></i>\n                            ' + editor.i18next.t("menus.dropListMenu.justify.\u9760\u5DE6") + "\n                        </p>"),
                value: "left"
              }, {
                $elem: dom_core_1["default"]('<p>\n                            <i class="w-e-icon-paragraph-center w-e-drop-list-item"></i>\n                            ' + editor.i18next.t("menus.dropListMenu.justify.\u5C45\u4E2D") + "\n                        </p>"),
                value: "center"
              }, {
                $elem: dom_core_1["default"]('<p>\n                            <i class="w-e-icon-paragraph-right w-e-drop-list-item"></i>\n                            ' + editor.i18next.t("menus.dropListMenu.justify.\u9760\u53F3") + "\n                        </p>"),
                value: "right"
              }, {
                $elem: dom_core_1["default"]('<p>\n                            <i class="w-e-icon-paragraph-justify w-e-drop-list-item"></i>\n                            ' + editor.i18next.t("menus.dropListMenu.justify.\u4E24\u7AEF") + "\n                        </p>"),
                value: "justify"
              }],
              clickHandler: function clickHandler(value) {
                _this.command(value);
              }
            };
            _this = _super.call(this, $elem, editor, dropListConf) || this;
            return _this;
          }
          Justify2.prototype.command = function(value) {
            var editor = this.editor;
            var selection = editor.selection;
            var $selectionElem = selection.getSelectionContainerElem();
            selection.saveRange();
            var $elems = editor.selection.getSelectionRangeTopNodes();
            if ($selectionElem === null || $selectionElem === void 0 ? void 0 : $selectionElem.length) {
              if (this.isSpecialNode($selectionElem, $elems[0]) || this.isSpecialTopNode($elems[0])) {
                var el = this.getSpecialNodeUntilTop($selectionElem, $elems[0]);
                if (el == null)
                  return;
                dom_core_1["default"](el).css("text-align", value);
              } else {
                (0, _forEach["default"])($elems).call($elems, function(el2) {
                  el2.css("text-align", value);
                });
              }
            }
            selection.restoreSelection();
          };
          Justify2.prototype.getSpecialNodeUntilTop = function(el, topEl) {
            var parentNode = el.elems[0];
            var topNode = topEl.elems[0];
            while (parentNode != null) {
              if ((0, _indexOf["default"])(SPECIAL_NODE_LIST).call(SPECIAL_NODE_LIST, parentNode === null || parentNode === void 0 ? void 0 : parentNode.nodeName) !== -1) {
                return parentNode;
              }
              if (parentNode.parentNode === topNode) {
                return parentNode;
              }
              parentNode = parentNode.parentNode;
            }
            return parentNode;
          };
          Justify2.prototype.isSpecialNode = function(el, topEl) {
            var parentNode = this.getSpecialNodeUntilTop(el, topEl);
            if (parentNode == null)
              return false;
            return (0, _indexOf["default"])(SPECIAL_NODE_LIST).call(SPECIAL_NODE_LIST, parentNode.nodeName) !== -1;
          };
          Justify2.prototype.isSpecialTopNode = function(topEl) {
            var _a;
            if (topEl == null)
              return false;
            return (0, _indexOf["default"])(SPECIAL_TOP_NODE_LIST).call(SPECIAL_TOP_NODE_LIST, (_a = topEl.elems[0]) === null || _a === void 0 ? void 0 : _a.nodeName) !== -1;
          };
          Justify2.prototype.tryChangeActive = function() {
          };
          return Justify2;
        }(DropListMenu_1["default"]);
        exports2["default"] = Justify;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var BtnMenu_1 = tslib_1.__importDefault(__webpack_require__(23));
        var bind_event_1 = tslib_1.__importDefault(__webpack_require__(335));
        var create_quote_node_1 = tslib_1.__importDefault(__webpack_require__(336));
        var const_1 = __webpack_require__(7);
        var Quote = function(_super) {
          tslib_1.__extends(Quote2, _super);
          function Quote2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u5F15\u7528">\n                <i class="w-e-icon-quotes-left"></i>\n            </div>');
            _this = _super.call(this, $elem, editor) || this;
            bind_event_1["default"](editor);
            return _this;
          }
          Quote2.prototype.clickHandler = function() {
            var _a, _b;
            var editor = this.editor;
            var isSelectEmpty = editor.selection.isSelectionEmpty();
            var topNodeElem = editor.selection.getSelectionRangeTopNodes();
            var $topNodeElem = topNodeElem[topNodeElem.length - 1];
            var nodeName = this.getTopNodeName();
            if (nodeName === "BLOCKQUOTE") {
              var $targetELem = dom_core_1["default"]($topNodeElem.childNodes());
              var len = $targetELem.length;
              var $middle_1 = $topNodeElem;
              (0, _forEach["default"])($targetELem).call($targetELem, function(elem) {
                var $elem = dom_core_1["default"](elem);
                $elem.insertAfter($middle_1);
                $middle_1 = $elem;
              });
              $topNodeElem.remove();
              editor.selection.moveCursor($targetELem.elems[len - 1]);
              this.tryChangeActive();
            } else {
              var $quote = create_quote_node_1["default"](topNodeElem);
              if (editor.$textElem.equal($topNodeElem)) {
                var containerElem = (_a = editor.selection.getSelectionContainerElem()) === null || _a === void 0 ? void 0 : _a.elems[0];
                editor.selection.createRangeByElems(containerElem.children[0], containerElem.children[0]);
                topNodeElem = editor.selection.getSelectionRangeTopNodes();
                $quote = create_quote_node_1["default"](topNodeElem);
                $topNodeElem.append($quote);
              } else {
                $quote.insertAfter($topNodeElem);
              }
              this.delSelectNode(topNodeElem);
              var moveNode = (_b = $quote.childNodes()) === null || _b === void 0 ? void 0 : _b.last().getNode();
              if (moveNode == null)
                return;
              moveNode.textContent ? editor.selection.moveCursor(moveNode) : editor.selection.moveCursor(moveNode, 0);
              this.tryChangeActive();
              dom_core_1["default"](const_1.EMPTY_P).insertAfter($quote);
              return;
            }
            if (isSelectEmpty) {
              editor.selection.collapseRange();
              editor.selection.restoreSelection();
            }
          };
          Quote2.prototype.tryChangeActive = function() {
            var _a;
            var editor = this.editor;
            var cmdValue = (_a = editor.selection.getSelectionRangeTopNodes()[0]) === null || _a === void 0 ? void 0 : _a.getNodeName();
            if (cmdValue === "BLOCKQUOTE") {
              this.active();
            } else {
              this.unActive();
            }
          };
          Quote2.prototype.getTopNodeName = function() {
            var editor = this.editor;
            var $topNodeElem = editor.selection.getSelectionRangeTopNodes()[0];
            var nodeName = $topNodeElem === null || $topNodeElem === void 0 ? void 0 : $topNodeElem.getNodeName();
            return nodeName;
          };
          Quote2.prototype.delSelectNode = function(selectElem) {
            (0, _forEach["default"])(selectElem).call(selectElem, function(node) {
              node.remove();
            });
          };
          return Quote2;
        }(BtnMenu_1["default"]);
        exports2["default"] = Quote;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var const_1 = __webpack_require__(7);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        function bindEvent(editor) {
          function quoteEnter(e) {
            var _a;
            var $selectElem = editor.selection.getSelectionContainerElem();
            var $topSelectElem = editor.selection.getSelectionRangeTopNodes()[0];
            if (($topSelectElem === null || $topSelectElem === void 0 ? void 0 : $topSelectElem.getNodeName()) === "BLOCKQUOTE") {
              if ($selectElem.getNodeName() === "BLOCKQUOTE") {
                var selectNode = (_a = $selectElem.childNodes()) === null || _a === void 0 ? void 0 : _a.getNode();
                editor.selection.moveCursor(selectNode);
              }
              if ($selectElem.text() === "") {
                e.preventDefault();
                $selectElem.remove();
                var $newLine = dom_core_1["default"](const_1.EMPTY_P);
                $newLine.insertAfter($topSelectElem);
                editor.selection.moveCursor($newLine.getNode(), 0);
              }
              if ($topSelectElem.text() === "") {
                $topSelectElem.remove();
              }
            }
          }
          editor.txt.eventHooks.enterDownEvents.push(quoteEnter);
        }
        exports2["default"] = bindEvent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        function createQuote($childElem) {
          var $targetElem = dom_core_1["default"]("<blockquote></blockquote>");
          (0, _forEach["default"])($childElem).call($childElem, function(node) {
            $targetElem.append(node.clone(true));
          });
          return $targetElem;
        }
        exports2["default"] = createQuote;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _map = _interopRequireDefault(__webpack_require__(26));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var DropListMenu_1 = tslib_1.__importDefault(__webpack_require__(24));
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var util_1 = __webpack_require__(6);
        var BackColor = function(_super) {
          tslib_1.__extends(BackColor2, _super);
          function BackColor2(editor) {
            var _context;
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u80CC\u666F\u8272">\n                <i class="w-e-icon-paint-brush"></i>\n            </div>');
            var colorListConf = {
              width: 120,
              title: "\u80CC\u666F\u989C\u8272",
              type: "inline-block",
              list: (0, _map["default"])(_context = editor.config.colors).call(_context, function(color) {
                return {
                  $elem: dom_core_1["default"]('<i style="color:' + color + ';" class="w-e-icon-paint-brush"></i>'),
                  value: color
                };
              }),
              clickHandler: function clickHandler(value) {
                _this.command(value);
              }
            };
            _this = _super.call(this, $elem, editor, colorListConf) || this;
            return _this;
          }
          BackColor2.prototype.command = function(value) {
            var _a;
            var editor = this.editor;
            var isEmptySelection = editor.selection.isSelectionEmpty();
            var $selectionElem = (_a = editor.selection.getSelectionContainerElem()) === null || _a === void 0 ? void 0 : _a.elems[0];
            if ($selectionElem == null)
              return;
            var isSpan = ($selectionElem === null || $selectionElem === void 0 ? void 0 : $selectionElem.nodeName.toLowerCase()) !== "p";
            var bgColor = $selectionElem === null || $selectionElem === void 0 ? void 0 : $selectionElem.style.backgroundColor;
            var isSameColor = util_1.hexToRgb(value) === bgColor;
            if (isEmptySelection) {
              if (isSpan && !isSameColor) {
                var $elems = editor.selection.getSelectionRangeTopNodes();
                editor.selection.createRangeByElem($elems[0]);
                editor.selection.moveCursor($elems[0].elems[0]);
              }
              editor.selection.createEmptyRange();
            }
            editor.cmd["do"]("backColor", value);
            if (isEmptySelection) {
              editor.selection.collapseRange();
              editor.selection.restoreSelection();
            }
          };
          BackColor2.prototype.tryChangeActive = function() {
          };
          return BackColor2;
        }(DropListMenu_1["default"]);
        exports2["default"] = BackColor;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _map = _interopRequireDefault(__webpack_require__(26));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var DropListMenu_1 = tslib_1.__importDefault(__webpack_require__(24));
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var FontColor = function(_super) {
          tslib_1.__extends(FontColor2, _super);
          function FontColor2(editor) {
            var _context;
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u6587\u5B57\u989C\u8272">\n                <i class="w-e-icon-pencil2"></i>\n            </div>');
            var colorListConf = {
              width: 120,
              title: "\u6587\u5B57\u989C\u8272",
              type: "inline-block",
              list: (0, _map["default"])(_context = editor.config.colors).call(_context, function(color) {
                return {
                  $elem: dom_core_1["default"]('<i style="color:' + color + ';" class="w-e-icon-pencil2"></i>'),
                  value: color
                };
              }),
              clickHandler: function clickHandler(value) {
                _this.command(value);
              }
            };
            _this = _super.call(this, $elem, editor, colorListConf) || this;
            return _this;
          }
          FontColor2.prototype.command = function(value) {
            var _a;
            var editor = this.editor;
            var isEmptySelection = editor.selection.isSelectionEmpty();
            var $selectionElem = (_a = editor.selection.getSelectionContainerElem()) === null || _a === void 0 ? void 0 : _a.elems[0];
            if ($selectionElem == null)
              return;
            var $selectionText = editor.selection.getSelectionText();
            if ($selectionElem.nodeName === "A" && $selectionElem.textContent === $selectionText) {
              var _payloadElem = dom_core_1["default"]("<span>&#8203;</span>").getNode();
              $selectionElem.appendChild(_payloadElem);
            }
            editor.cmd["do"]("foreColor", value);
            if (isEmptySelection) {
              editor.selection.collapseRange();
              editor.selection.restoreSelection();
            }
          };
          FontColor2.prototype.tryChangeActive = function() {
          };
          return FontColor2;
        }(DropListMenu_1["default"]);
        exports2["default"] = FontColor;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var Panel_1 = tslib_1.__importDefault(__webpack_require__(33));
        var PanelMenu_1 = tslib_1.__importDefault(__webpack_require__(38));
        var create_panel_conf_1 = tslib_1.__importDefault(__webpack_require__(340));
        var index_1 = tslib_1.__importDefault(__webpack_require__(346));
        var Video = function(_super) {
          tslib_1.__extends(Video2, _super);
          function Video2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u89C6\u9891">\n                <i class="w-e-icon-play"></i>\n            </div>');
            _this = _super.call(this, $elem, editor) || this;
            index_1["default"](editor);
            return _this;
          }
          Video2.prototype.clickHandler = function() {
            this.createPanel("");
          };
          Video2.prototype.createPanel = function(iframe) {
            var conf = create_panel_conf_1["default"](this.editor, iframe);
            var panel = new Panel_1["default"](this, conf);
            panel.create();
          };
          Video2.prototype.tryChangeActive = function() {
          };
          return Video2;
        }(PanelMenu_1["default"]);
        exports2["default"] = Video;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _trim = _interopRequireDefault(__webpack_require__(17));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var util_1 = __webpack_require__(6);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var upload_video_1 = tslib_1.__importDefault(__webpack_require__(341));
        var const_1 = __webpack_require__(7);
        function default_1(editor, video) {
          var config = editor.config;
          var uploadVideo = new upload_video_1["default"](editor);
          var inputIFrameId = util_1.getRandom("input-iframe");
          var btnOkId = util_1.getRandom("btn-ok");
          var inputUploadId = util_1.getRandom("input-upload");
          var btnStartId = util_1.getRandom("btn-local-ok");
          function insertVideo(video2) {
            editor.cmd["do"]("insertHTML", video2 + const_1.EMPTY_P);
            editor.config.onlineVideoCallback(video2);
          }
          function checkOnlineVideo(video2) {
            var check = editor.config.onlineVideoCheck(video2);
            if (check === true) {
              return true;
            }
            if (typeof check === "string") {
              editor.config.customAlert(check, "error");
            }
            return false;
          }
          var tabsConf = [{
            title: editor.i18next.t("menus.panelMenus.video.\u4E0A\u4F20\u89C6\u9891"),
            tpl: '<div class="w-e-up-video-container">\n                    <div id="' + btnStartId + '" class="w-e-up-btn">\n                        <i class="w-e-icon-upload2"></i>\n                    </div>\n                    <div style="display:none;">\n                        <input id="' + inputUploadId + '" type="file" accept="video/*"/>\n                    </div>\n                 </div>',
            events: [
              {
                selector: "#" + btnStartId,
                type: "click",
                fn: function fn() {
                  var $file = dom_core_1["default"]("#" + inputUploadId);
                  var fileElem = $file.elems[0];
                  if (fileElem) {
                    fileElem.click();
                  } else {
                    return true;
                  }
                }
              },
              {
                selector: "#" + inputUploadId,
                type: "change",
                fn: function fn() {
                  var $file = dom_core_1["default"]("#" + inputUploadId);
                  var fileElem = $file.elems[0];
                  if (!fileElem) {
                    return true;
                  }
                  var fileList = fileElem.files;
                  if (fileList.length) {
                    uploadVideo.uploadVideo(fileList);
                  }
                  return true;
                }
              }
            ]
          }, {
            title: editor.i18next.t("menus.panelMenus.video.\u63D2\u5165\u89C6\u9891"),
            tpl: '<div>\n                    <input \n                        id="' + inputIFrameId + '" \n                        type="text" \n                        class="block" \n                        placeholder="' + editor.i18next.t("\u5982") + '\uFF1A<iframe src=... ></iframe>"/>\n                    </td>\n                    <div class="w-e-button-container">\n                        <button type="button" id="' + btnOkId + '" class="right">\n                            ' + editor.i18next.t("\u63D2\u5165") + "\n                        </button>\n                    </div>\n                </div>",
            events: [
              {
                selector: "#" + btnOkId,
                type: "click",
                fn: function fn() {
                  var _context;
                  var $video = dom_core_1["default"]("#" + inputIFrameId);
                  var video2 = (0, _trim["default"])(_context = $video.val()).call(_context);
                  if (!video2)
                    return;
                  if (!checkOnlineVideo(video2))
                    return;
                  insertVideo(video2);
                  return true;
                },
                bindEnter: true
              }
            ]
          }];
          var conf = {
            width: 300,
            height: 0,
            tabs: []
          };
          if (window.FileReader && (config.uploadVideoServer || config.customUploadVideo)) {
            conf.tabs.push(tabsConf[0]);
          }
          if (config.showLinkVideo) {
            conf.tabs.push(tabsConf[1]);
          }
          return conf;
        }
        exports2["default"] = default_1;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _some = _interopRequireDefault(__webpack_require__(133));
        var _bind = _interopRequireDefault(__webpack_require__(57));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _indexOf = _interopRequireDefault(__webpack_require__(27));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var util_1 = __webpack_require__(6);
        var upload_core_1 = tslib_1.__importDefault(__webpack_require__(135));
        var progress_1 = tslib_1.__importDefault(__webpack_require__(136));
        var const_1 = __webpack_require__(7);
        var util_2 = __webpack_require__(6);
        var UploadVideo = function() {
          function UploadVideo2(editor) {
            this.editor = editor;
          }
          UploadVideo2.prototype.uploadVideo = function(files) {
            var _this = this;
            if (!files.length) {
              return;
            }
            var editor = this.editor;
            var config = editor.config;
            var i18nPrefix = "validate.";
            var t = function t2(text) {
              return editor.i18next.t(i18nPrefix + text);
            };
            var uploadVideoServer = config.uploadVideoServer;
            var maxSize = config.uploadVideoMaxSize;
            var uploadVideoMaxSize = maxSize / 1024;
            var uploadVideoName = config.uploadVideoName;
            var uploadVideoParams = config.uploadVideoParams;
            var uploadVideoParamsWithUrl = config.uploadVideoParamsWithUrl;
            var uploadVideoHeaders = config.uploadVideoHeaders;
            var uploadVideoHooks = config.uploadVideoHooks;
            var uploadVideoTimeout = config.uploadVideoTimeout;
            var withVideoCredentials = config.withVideoCredentials;
            var customUploadVideo = config.customUploadVideo;
            var uploadVideoAccept = config.uploadVideoAccept;
            var resultFiles = [];
            var errInfos = [];
            util_1.arrForEach(files, function(file) {
              var name = file.name;
              var size = file.size / 1024 / 1024;
              if (!name || !size) {
                return;
              }
              if (!(uploadVideoAccept instanceof Array)) {
                errInfos.push("\u3010" + uploadVideoAccept + "\u3011" + t("uploadVideoAccept \u4E0D\u662FArray"));
                return;
              }
              if (!(0, _some["default"])(uploadVideoAccept).call(uploadVideoAccept, function(item) {
                return item === name.split(".")[name.split(".").length - 1];
              })) {
                errInfos.push("\u3010" + name + "\u3011" + t("\u4E0D\u662F\u89C6\u9891"));
                return;
              }
              if (uploadVideoMaxSize < size) {
                errInfos.push("\u3010" + name + "\u3011" + t("\u5927\u4E8E") + " " + uploadVideoMaxSize + "M");
                return;
              }
              resultFiles.push(file);
            });
            if (errInfos.length) {
              config.customAlert(t("\u89C6\u9891\u9A8C\u8BC1\u672A\u901A\u8FC7") + ": \n" + errInfos.join("\n"), "warning");
              return;
            }
            if (resultFiles.length === 0) {
              config.customAlert(t("\u4F20\u5165\u7684\u6587\u4EF6\u4E0D\u5408\u6CD5"), "warning");
              return;
            }
            if (customUploadVideo && typeof customUploadVideo === "function") {
              var _context;
              customUploadVideo(resultFiles, (0, _bind["default"])(_context = this.insertVideo).call(_context, this));
              return;
            }
            var formData = new FormData();
            (0, _forEach["default"])(resultFiles).call(resultFiles, function(file, index2) {
              var name = uploadVideoName || file.name;
              if (resultFiles.length > 1) {
                name = name + (index2 + 1);
              }
              formData.append(name, file);
            });
            if (uploadVideoServer) {
              var uploadVideoServerArr = uploadVideoServer.split("#");
              uploadVideoServer = uploadVideoServerArr[0];
              var uploadVideoServerHash = uploadVideoServerArr[1] || "";
              (0, _forEach["default"])(util_1).call(util_1, uploadVideoParams, function(key, val) {
                if (uploadVideoParamsWithUrl) {
                  if ((0, _indexOf["default"])(uploadVideoServer).call(uploadVideoServer, "?") > 0) {
                    uploadVideoServer += "&";
                  } else {
                    uploadVideoServer += "?";
                  }
                  uploadVideoServer = uploadVideoServer + key + "=" + val;
                }
                formData.append(key, val);
              });
              if (uploadVideoServerHash) {
                uploadVideoServer += "#" + uploadVideoServerHash;
              }
              var xhr = upload_core_1["default"](uploadVideoServer, {
                timeout: uploadVideoTimeout,
                formData,
                headers: uploadVideoHeaders,
                withCredentials: !!withVideoCredentials,
                beforeSend: function beforeSend(xhr2) {
                  if (uploadVideoHooks.before)
                    return uploadVideoHooks.before(xhr2, editor, resultFiles);
                },
                onTimeout: function onTimeout(xhr2) {
                  config.customAlert(t("\u4E0A\u4F20\u89C6\u9891\u8D85\u65F6"), "error");
                  if (uploadVideoHooks.timeout)
                    uploadVideoHooks.timeout(xhr2, editor);
                },
                onProgress: function onProgress(percent, e) {
                  var progressBar = new progress_1["default"](editor);
                  if (e.lengthComputable) {
                    percent = e.loaded / e.total;
                    progressBar.show(percent);
                  }
                },
                onError: function onError(xhr2) {
                  config.customAlert(t("\u4E0A\u4F20\u89C6\u9891\u9519\u8BEF"), "error", t("\u4E0A\u4F20\u89C6\u9891\u9519\u8BEF") + "\uFF0C" + t("\u670D\u52A1\u5668\u8FD4\u56DE\u72B6\u6001") + ": " + xhr2.status);
                  if (uploadVideoHooks.error)
                    uploadVideoHooks.error(xhr2, editor);
                },
                onFail: function onFail(xhr2, resultStr) {
                  config.customAlert(t("\u4E0A\u4F20\u89C6\u9891\u5931\u8D25"), "error", t("\u4E0A\u4F20\u89C6\u9891\u8FD4\u56DE\u7ED3\u679C\u9519\u8BEF") + ("\uFF0C" + t("\u8FD4\u56DE\u7ED3\u679C") + ": ") + resultStr);
                  if (uploadVideoHooks.fail)
                    uploadVideoHooks.fail(xhr2, editor, resultStr);
                },
                onSuccess: function onSuccess(xhr2, result) {
                  if (uploadVideoHooks.customInsert) {
                    var _context2;
                    uploadVideoHooks.customInsert((0, _bind["default"])(_context2 = _this.insertVideo).call(_context2, _this), result, editor);
                    return;
                  }
                  if (result.errno != "0") {
                    config.customAlert(t("\u4E0A\u4F20\u89C6\u9891\u5931\u8D25"), "error", t("\u4E0A\u4F20\u89C6\u9891\u8FD4\u56DE\u7ED3\u679C\u9519\u8BEF") + "\uFF0C" + t("\u8FD4\u56DE\u7ED3\u679C") + " errno=" + result.errno);
                    if (uploadVideoHooks.fail)
                      uploadVideoHooks.fail(xhr2, editor, result);
                    return;
                  }
                  var data = result.data;
                  _this.insertVideo(data.url);
                  if (uploadVideoHooks.success)
                    uploadVideoHooks.success(xhr2, editor, result);
                }
              });
              if (typeof xhr === "string") {
                config.customAlert(xhr, "error");
              }
            }
          };
          UploadVideo2.prototype.insertVideo = function(url) {
            var editor = this.editor;
            var config = editor.config;
            var i18nPrefix = "validate.";
            var t = function t2(text, prefix) {
              if (prefix === void 0) {
                prefix = i18nPrefix;
              }
              return editor.i18next.t(prefix + text);
            };
            if (!config.customInsertVideo) {
              if (util_2.UA.isFirefox) {
                editor.cmd["do"]("insertHTML", '<p data-we-video-p="true"><video src="' + url + '" controls="controls" style="max-width:100%"></video></p><p>&#8203</p>');
              } else {
                editor.cmd["do"]("insertHTML", '<video src="' + url + '" controls="controls" style="max-width:100%"></video>' + const_1.EMPTY_P);
              }
            } else {
              config.customInsertVideo(url);
              return;
            }
            var video = document.createElement("video");
            video.onload = function() {
              video = null;
            };
            video.onerror = function() {
              config.customAlert(t("\u63D2\u5165\u89C6\u9891\u9519\u8BEF"), "error", "wangEditor: " + t("\u63D2\u5165\u89C6\u9891\u9519\u8BEF") + "\uFF0C" + t("\u89C6\u9891\u94FE\u63A5") + ' "' + url + '"\uFF0C' + t("\u4E0B\u8F7D\u94FE\u63A5\u5931\u8D25"));
              video = null;
            };
            video.onabort = function() {
              return video = null;
            };
            video.src = url;
          };
          return UploadVideo2;
        }();
        exports2["default"] = UploadVideo;
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(343);
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(344);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(345);
        var path = __webpack_require__(9);
        module2.exports = path.Date.now;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        $({ target: "Date", stat: true }, {
          now: function now() {
            return new Date().getTime();
          }
        });
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var tooltip_event_1 = tslib_1.__importDefault(__webpack_require__(347));
        var keyboard_1 = tslib_1.__importDefault(__webpack_require__(349));
        function bindEvent(editor) {
          tooltip_event_1["default"](editor);
          keyboard_1["default"](editor);
        }
        exports2["default"] = bindEvent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.createShowHideFn = void 0;
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var Tooltip_1 = tslib_1.__importDefault(__webpack_require__(39));
        var video_alignment_1 = tslib_1.__importDefault(__webpack_require__(348));
        function createShowHideFn(editor) {
          var tooltip;
          var t = function t2(text, prefix) {
            if (prefix === void 0) {
              prefix = "";
            }
            return editor.i18next.t(prefix + text);
          };
          function showVideoTooltip($node) {
            var conf = [{
              $elem: dom_core_1["default"]("<span class='w-e-icon-trash-o'></span>"),
              onClick: function onClick(editor2, $node2) {
                $node2.remove();
                return true;
              }
            }, {
              $elem: dom_core_1["default"]("<span>100%</span>"),
              onClick: function onClick(editor2, $node2) {
                $node2.attr("width", "100%");
                $node2.removeAttr("height");
                return true;
              }
            }, {
              $elem: dom_core_1["default"]("<span>50%</span>"),
              onClick: function onClick(editor2, $node2) {
                $node2.attr("width", "50%");
                $node2.removeAttr("height");
                return true;
              }
            }, {
              $elem: dom_core_1["default"]("<span>30%</span>"),
              onClick: function onClick(editor2, $node2) {
                $node2.attr("width", "30%");
                $node2.removeAttr("height");
                return true;
              }
            }, {
              $elem: dom_core_1["default"]("<span>" + t("\u91CD\u7F6E") + "</span>"),
              onClick: function onClick(editor2, $node2) {
                $node2.removeAttr("width");
                $node2.removeAttr("height");
                return true;
              }
            }, {
              $elem: dom_core_1["default"]("<span>" + t("menus.justify.\u9760\u5DE6") + "</span>"),
              onClick: function onClick(editor2, $node2) {
                video_alignment_1["default"]($node2, "left");
                return true;
              }
            }, {
              $elem: dom_core_1["default"]("<span>" + t("menus.justify.\u5C45\u4E2D") + "</span>"),
              onClick: function onClick(editor2, $node2) {
                video_alignment_1["default"]($node2, "center");
                return true;
              }
            }, {
              $elem: dom_core_1["default"]("<span>" + t("menus.justify.\u9760\u53F3") + "</span>"),
              onClick: function onClick(editor2, $node2) {
                video_alignment_1["default"]($node2, "right");
                return true;
              }
            }];
            tooltip = new Tooltip_1["default"](editor, $node, conf);
            tooltip.create();
          }
          function hideVideoTooltip() {
            if (tooltip) {
              tooltip.remove();
              tooltip = null;
            }
          }
          return {
            showVideoTooltip,
            hideVideoTooltip
          };
        }
        exports2.createShowHideFn = createShowHideFn;
        function bindTooltipEvent(editor) {
          var _a = createShowHideFn(editor), showVideoTooltip = _a.showVideoTooltip, hideVideoTooltip = _a.hideVideoTooltip;
          editor.txt.eventHooks.videoClickEvents.push(showVideoTooltip);
          editor.txt.eventHooks.clickEvents.push(hideVideoTooltip);
          editor.txt.eventHooks.keyupEvents.push(hideVideoTooltip);
          editor.txt.eventHooks.toolbarClickEvents.push(hideVideoTooltip);
          editor.txt.eventHooks.menuClickEvents.push(hideVideoTooltip);
          editor.txt.eventHooks.textScrollEvents.push(hideVideoTooltip);
          editor.txt.eventHooks.changeEvents.push(hideVideoTooltip);
        }
        exports2["default"] = bindTooltipEvent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _includes = _interopRequireDefault(__webpack_require__(28));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        function setAlignment($node, value) {
          var NODENAME = ["P"];
          var topNode = getSelectedTopNode($node, NODENAME);
          if (topNode) {
            dom_core_1["default"](topNode).css("text-align", value);
          }
        }
        exports2["default"] = setAlignment;
        function getSelectedTopNode(el, tag) {
          var _a;
          var parentNode = el.elems[0];
          while (parentNode != null) {
            if ((0, _includes["default"])(tag).call(tag, parentNode === null || parentNode === void 0 ? void 0 : parentNode.nodeName)) {
              return parentNode;
            }
            if (((_a = parentNode === null || parentNode === void 0 ? void 0 : parentNode.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName) === "BODY") {
              return null;
            }
            parentNode = parentNode.parentNode;
          }
          return parentNode;
        }
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var util_1 = __webpack_require__(6);
        function bindEventKeyboardEvent(editor) {
          if (!util_1.UA.isFirefox)
            return;
          var txt = editor.txt, selection = editor.selection;
          var keydownEvents = txt.eventHooks.keydownEvents;
          keydownEvents.push(function(e) {
            var $selectionContainerElem = selection.getSelectionContainerElem();
            if ($selectionContainerElem) {
              var $topElem = $selectionContainerElem.getNodeTop(editor);
              var $preElem = $topElem.length ? $topElem.prev().length ? $topElem.prev() : null : null;
              if ($preElem && $preElem.attr("data-we-video-p")) {
                if (selection.getCursorPos() === 0) {
                  if (e.keyCode === 8) {
                    $preElem.remove();
                  }
                }
              }
            }
          });
        }
        exports2["default"] = bindEventKeyboardEvent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _map = _interopRequireDefault(__webpack_require__(26));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var const_1 = __webpack_require__(7);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var Panel_1 = tslib_1.__importDefault(__webpack_require__(33));
        var PanelMenu_1 = tslib_1.__importDefault(__webpack_require__(38));
        var index_1 = tslib_1.__importDefault(__webpack_require__(351));
        var create_panel_conf_1 = tslib_1.__importDefault(__webpack_require__(364));
        var Image = function(_super) {
          tslib_1.__extends(Image2, _super);
          function Image2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u56FE\u7247"><i class="w-e-icon-image"></i></div>');
            var imgPanelConfig = create_panel_conf_1["default"](editor);
            if (imgPanelConfig.onlyUploadConf) {
              var _context;
              $elem = imgPanelConfig.onlyUploadConf.$elem;
              (0, _map["default"])(_context = imgPanelConfig.onlyUploadConf.events).call(_context, function(event) {
                var type = event.type;
                var fn = event.fn || const_1.EMPTY_FN;
                $elem.on(type, function(e) {
                  e.stopPropagation();
                  fn(e);
                });
              });
            }
            _this = _super.call(this, $elem, editor) || this;
            _this.imgPanelConfig = imgPanelConfig;
            index_1["default"](editor);
            return _this;
          }
          Image2.prototype.clickHandler = function() {
            if (!this.imgPanelConfig.onlyUploadConf) {
              this.createPanel();
            }
          };
          Image2.prototype.createPanel = function() {
            var conf = this.imgPanelConfig;
            var panel = new Panel_1["default"](this, conf);
            this.setPanel(panel);
            panel.create();
          };
          Image2.prototype.tryChangeActive = function() {
          };
          return Image2;
        }(PanelMenu_1["default"]);
        exports2["default"] = Image;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var paste_img_1 = tslib_1.__importDefault(__webpack_require__(352));
        var drop_img_1 = tslib_1.__importDefault(__webpack_require__(353));
        var drag_size_1 = tslib_1.__importDefault(__webpack_require__(354));
        var tooltip_event_1 = tslib_1.__importDefault(__webpack_require__(362));
        var keyboard_event_1 = tslib_1.__importDefault(__webpack_require__(363));
        function bindEvent(editor) {
          paste_img_1["default"](editor);
          drop_img_1["default"](editor);
          drag_size_1["default"](editor);
          tooltip_event_1["default"](editor);
          keyboard_event_1["default"](editor);
        }
        exports2["default"] = bindEvent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var paste_event_1 = __webpack_require__(131);
        var upload_img_1 = tslib_1.__importDefault(__webpack_require__(97));
        function _haveTextOrHtml(editor, e) {
          var config = editor.config;
          var pasteFilterStyle = config.pasteFilterStyle;
          var pasteIgnoreImg = config.pasteIgnoreImg;
          var pasteHtml = paste_event_1.getPasteHtml(e, pasteFilterStyle, pasteIgnoreImg);
          if (pasteHtml)
            return true;
          var pasteText = paste_event_1.getPasteText(e);
          if (pasteText)
            return true;
          return false;
        }
        function _haveFiles(editor, e) {
          var _a;
          var types = ((_a = e.clipboardData) === null || _a === void 0 ? void 0 : _a.types) || [];
          for (var i = 0; i < types.length; i++) {
            var type = types[i];
            if (type === "Files") {
              return true;
            }
          }
          return false;
        }
        function pasteImgHandler(e, editor) {
          if (!_haveFiles(editor, e)) {
            if (_haveTextOrHtml(editor, e)) {
              return;
            }
          }
          var pastedFiles = paste_event_1.getPasteImgs(e);
          if (!pastedFiles.length) {
            return;
          }
          var uploadImg = new upload_img_1["default"](editor);
          uploadImg.uploadImg(pastedFiles);
        }
        function bindPasteImg(editor) {
          editor.txt.eventHooks.pasteEvents.unshift(function(e) {
            pasteImgHandler(e, editor);
          });
        }
        exports2["default"] = bindPasteImg;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var upload_img_1 = tslib_1.__importDefault(__webpack_require__(97));
        function bindDropImg(editor) {
          function dropImgHandler(e) {
            var files = e.dataTransfer && e.dataTransfer.files;
            if (!files || !files.length) {
              return;
            }
            var uploadImg = new upload_img_1["default"](editor);
            uploadImg.uploadImg(files);
          }
          editor.txt.eventHooks.dropEvents.push(dropImgHandler);
        }
        exports2["default"] = bindDropImg;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _find = _interopRequireDefault(__webpack_require__(29));
        var _parseFloat2 = _interopRequireDefault(__webpack_require__(355));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.createShowHideFn = void 0;
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        __webpack_require__(360);
        var util_1 = __webpack_require__(6);
        function setDragStyle($drag, width, height, left, top) {
          $drag.attr("style", "width:" + width + "px; height:" + height + "px; left:" + left + "px; top:" + top + "px;");
        }
        function createDragBox(editor, $textContainerElem) {
          var $drag = dom_core_1["default"]('<div class="w-e-img-drag-mask">\n            <div class="w-e-img-drag-show-size"></div>\n            <div class="w-e-img-drag-rb"></div>\n         </div>');
          $drag.hide();
          $textContainerElem.append($drag);
          return $drag;
        }
        function showDargBox($textContainerElem, $drag, $img) {
          var boxRect = $textContainerElem.getBoundingClientRect();
          var rect = $img.getBoundingClientRect();
          var rectW = rect.width.toFixed(2);
          var rectH = rect.height.toFixed(2);
          (0, _find["default"])($drag).call($drag, ".w-e-img-drag-show-size").text(rectW + "px * " + rectH + "px");
          setDragStyle($drag, (0, _parseFloat2["default"])(rectW), (0, _parseFloat2["default"])(rectH), rect.left - boxRect.left, rect.top - boxRect.top);
          $drag.show();
        }
        function createShowHideFn(editor) {
          var $textContainerElem = editor.$textContainerElem;
          var $imgTarget;
          var $drag = createDragBox(editor, $textContainerElem);
          function bindDragEvents($drag2, $container) {
            $drag2.on("click", function(e) {
              e.stopPropagation();
            });
            $drag2.on("mousedown", ".w-e-img-drag-rb", function(e) {
              e.preventDefault();
              if (!$imgTarget)
                return;
              var firstX = e.clientX;
              var firstY = e.clientY;
              var boxRect = $container.getBoundingClientRect();
              var imgRect = $imgTarget.getBoundingClientRect();
              var width = imgRect.width;
              var height = imgRect.height;
              var left = imgRect.left - boxRect.left;
              var top = imgRect.top - boxRect.top;
              var ratio = width / height;
              var setW = width;
              var setH = height;
              var $document = dom_core_1["default"](document);
              function offEvents() {
                $document.off("mousemove", mouseMoveHandler);
                $document.off("mouseup", mouseUpHandler);
              }
              function mouseMoveHandler(ev) {
                ev.stopPropagation();
                ev.preventDefault();
                setW = width + (ev.clientX - firstX);
                setH = height + (ev.clientY - firstY);
                if (setW / setH != ratio) {
                  setH = setW / ratio;
                }
                setW = (0, _parseFloat2["default"])(setW.toFixed(2));
                setH = (0, _parseFloat2["default"])(setH.toFixed(2));
                (0, _find["default"])($drag2).call($drag2, ".w-e-img-drag-show-size").text(setW.toFixed(2).replace(".00", "") + "px * " + setH.toFixed(2).replace(".00", "") + "px");
                setDragStyle($drag2, setW, setH, left, top);
              }
              $document.on("mousemove", mouseMoveHandler);
              function mouseUpHandler() {
                $imgTarget.attr("width", setW + "");
                $imgTarget.attr("height", setH + "");
                var newImgRect = $imgTarget.getBoundingClientRect();
                setDragStyle($drag2, setW, setH, newImgRect.left - boxRect.left, newImgRect.top - boxRect.top);
                offEvents();
              }
              $document.on("mouseup", mouseUpHandler);
              $document.on("mouseleave", offEvents);
            });
          }
          function showDrag($target) {
            if (util_1.UA.isIE())
              return false;
            if ($target) {
              $imgTarget = $target;
              showDargBox($textContainerElem, $drag, $imgTarget);
            }
          }
          function hideDrag() {
            (0, _find["default"])($textContainerElem).call($textContainerElem, ".w-e-img-drag-mask").hide();
          }
          bindDragEvents($drag, $textContainerElem);
          dom_core_1["default"](document).on("click", hideDrag);
          editor.beforeDestroy(function() {
            dom_core_1["default"](document).off("click", hideDrag);
          });
          return {
            showDrag,
            hideDrag
          };
        }
        exports2.createShowHideFn = createShowHideFn;
        function bindDragImgSize(editor) {
          var _a = createShowHideFn(editor), showDrag = _a.showDrag, hideDrag = _a.hideDrag;
          editor.txt.eventHooks.imgClickEvents.push(showDrag);
          editor.txt.eventHooks.textScrollEvents.push(hideDrag);
          editor.txt.eventHooks.keyupEvents.push(hideDrag);
          editor.txt.eventHooks.toolbarClickEvents.push(hideDrag);
          editor.txt.eventHooks.menuClickEvents.push(hideDrag);
          editor.txt.eventHooks.changeEvents.push(hideDrag);
        }
        exports2["default"] = bindDragImgSize;
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(356);
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(357);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(358);
        var path = __webpack_require__(9);
        module2.exports = path.parseFloat;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var parseFloatImplementation = __webpack_require__(359);
        $({ global: true, forced: parseFloat != parseFloatImplementation }, {
          parseFloat: parseFloatImplementation
        });
      },
      function(module2, exports2, __webpack_require__) {
        var global2 = __webpack_require__(8);
        var trim = __webpack_require__(90).trim;
        var whitespaces = __webpack_require__(68);
        var $parseFloat = global2.parseFloat;
        var FORCED = 1 / $parseFloat(whitespaces + "-0") !== -Infinity;
        module2.exports = FORCED ? function parseFloat2(string) {
          var trimmedString = trim(String(string));
          var result = $parseFloat(trimmedString);
          return result === 0 && trimmedString.charAt(0) == "-" ? -0 : result;
        } : $parseFloat;
      },
      function(module2, exports2, __webpack_require__) {
        var api = __webpack_require__(20);
        var content = __webpack_require__(361);
        content = content.__esModule ? content.default : content;
        if (typeof content === "string") {
          content = [[module2.i, content, ""]];
        }
        var options = {};
        options.insert = "head";
        options.singleton = false;
        api(content, options);
        module2.exports = content.locals || {};
      },
      function(module2, exports2, __webpack_require__) {
        var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(21);
        exports2 = ___CSS_LOADER_API_IMPORT___(false);
        exports2.push([module2.i, ".w-e-text-container {\n  overflow: hidden;\n}\n.w-e-img-drag-mask {\n  position: absolute;\n  z-index: 1;\n  border: 1px dashed #ccc;\n  box-sizing: border-box;\n}\n.w-e-img-drag-mask .w-e-img-drag-rb {\n  position: absolute;\n  right: -5px;\n  bottom: -5px;\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  background: #ccc;\n  cursor: se-resize;\n}\n.w-e-img-drag-mask .w-e-img-drag-show-size {\n  min-width: 110px;\n  height: 22px;\n  line-height: 22px;\n  font-size: 14px;\n  color: #999;\n  position: absolute;\n  left: 0;\n  top: 0;\n  background-color: #999;\n  color: #fff;\n  border-radius: 2px;\n  padding: 0 5px;\n}\n", ""]);
        module2.exports = exports2;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.createShowHideFn = void 0;
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var Tooltip_1 = tslib_1.__importDefault(__webpack_require__(39));
        function createShowHideFn(editor) {
          var tooltip;
          var t = function t2(text, prefix) {
            if (prefix === void 0) {
              prefix = "";
            }
            return editor.i18next.t(prefix + text);
          };
          function showImgTooltip($node) {
            var conf = [{
              $elem: dom_core_1["default"]("<span class='w-e-icon-trash-o'></span>"),
              onClick: function onClick(editor2, $node2) {
                editor2.selection.createRangeByElem($node2);
                editor2.selection.restoreSelection();
                editor2.cmd["do"]("delete");
                return true;
              }
            }, {
              $elem: dom_core_1["default"]("<span>30%</span>"),
              onClick: function onClick(editor2, $node2) {
                $node2.attr("width", "30%");
                $node2.removeAttr("height");
                return true;
              }
            }, {
              $elem: dom_core_1["default"]("<span>50%</span>"),
              onClick: function onClick(editor2, $node2) {
                $node2.attr("width", "50%");
                $node2.removeAttr("height");
                return true;
              }
            }, {
              $elem: dom_core_1["default"]("<span>100%</span>"),
              onClick: function onClick(editor2, $node2) {
                $node2.attr("width", "100%");
                $node2.removeAttr("height");
                return true;
              }
            }];
            conf.push({
              $elem: dom_core_1["default"]("<span>" + t("\u91CD\u7F6E") + "</span>"),
              onClick: function onClick(editor2, $node2) {
                $node2.removeAttr("width");
                $node2.removeAttr("height");
                return true;
              }
            });
            if ($node.attr("data-href")) {
              conf.push({
                $elem: dom_core_1["default"]("<span>" + t("\u67E5\u770B\u94FE\u63A5") + "</span>"),
                onClick: function onClick(editor2, $node2) {
                  var link = $node2.attr("data-href");
                  if (link) {
                    link = decodeURIComponent(link);
                    window.open(link, "_target");
                  }
                  return true;
                }
              });
            }
            tooltip = new Tooltip_1["default"](editor, $node, conf);
            tooltip.create();
          }
          function hideImgTooltip() {
            if (tooltip) {
              tooltip.remove();
              tooltip = null;
            }
          }
          return {
            showImgTooltip,
            hideImgTooltip
          };
        }
        exports2.createShowHideFn = createShowHideFn;
        function bindTooltipEvent(editor) {
          var _a = createShowHideFn(editor), showImgTooltip = _a.showImgTooltip, hideImgTooltip = _a.hideImgTooltip;
          editor.txt.eventHooks.imgClickEvents.push(showImgTooltip);
          editor.txt.eventHooks.clickEvents.push(hideImgTooltip);
          editor.txt.eventHooks.keyupEvents.push(hideImgTooltip);
          editor.txt.eventHooks.toolbarClickEvents.push(hideImgTooltip);
          editor.txt.eventHooks.menuClickEvents.push(hideImgTooltip);
          editor.txt.eventHooks.textScrollEvents.push(hideImgTooltip);
          editor.txt.eventHooks.imgDragBarMouseDownEvents.push(hideImgTooltip);
          editor.txt.eventHooks.changeEvents.push(hideImgTooltip);
        }
        exports2["default"] = bindTooltipEvent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        function bindEventKeyboardEvent(editor) {
          var txt = editor.txt, selection = editor.selection;
          var keydownEvents = txt.eventHooks.keydownEvents;
          keydownEvents.push(function(e) {
            var $selectionContainerElem = selection.getSelectionContainerElem();
            var range = selection.getRange();
            if (!range || !$selectionContainerElem || e.keyCode !== 8 || !selection.isSelectionEmpty()) {
              return;
            }
            var startContainer = range.startContainer, startOffset = range.startOffset;
            var prevNode = null;
            if (startOffset === 0) {
              while (startContainer !== $selectionContainerElem.elems[0] && $selectionContainerElem.elems[0].contains(startContainer) && startContainer.parentNode && !prevNode) {
                if (startContainer.previousSibling) {
                  prevNode = startContainer.previousSibling;
                  break;
                }
                startContainer = startContainer.parentNode;
              }
            } else if (startContainer.nodeType !== 3) {
              prevNode = startContainer.childNodes[startOffset - 1];
            }
            if (!prevNode) {
              return;
            }
            var lastChildNodeInPrevNode = prevNode;
            while (lastChildNodeInPrevNode.childNodes.length) {
              lastChildNodeInPrevNode = lastChildNodeInPrevNode.childNodes[lastChildNodeInPrevNode.childNodes.length - 1];
            }
            if (lastChildNodeInPrevNode instanceof HTMLElement && lastChildNodeInPrevNode.tagName === "IMG") {
              lastChildNodeInPrevNode.remove();
              e.preventDefault();
            }
          });
        }
        exports2["default"] = bindEventKeyboardEvent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _map = _interopRequireDefault(__webpack_require__(26));
        var _trim = _interopRequireDefault(__webpack_require__(17));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var util_1 = __webpack_require__(6);
        var upload_img_1 = tslib_1.__importDefault(__webpack_require__(97));
        function default_1(editor) {
          var _context;
          var config = editor.config;
          var uploadImg = new upload_img_1["default"](editor);
          var upTriggerId = util_1.getRandom("up-trigger-id");
          var upFileId = util_1.getRandom("up-file-id");
          var linkUrlId = util_1.getRandom("input-link-url");
          var linkUrlAltId = util_1.getRandom("input-link-url-alt");
          var linkUrlHrefId = util_1.getRandom("input-link-url-href");
          var linkBtnId = util_1.getRandom("btn-link");
          var i18nPrefix = "menus.panelMenus.image.";
          var t = function t2(text, prefix) {
            if (prefix === void 0) {
              prefix = i18nPrefix;
            }
            return editor.i18next.t(prefix + text);
          };
          function checkLinkImg(src, linkUrlAltText, linkUrlHrefText) {
            var check = config.linkImgCheck(src);
            if (check === true) {
              return true;
            } else if (typeof check === "string") {
              config.customAlert(check, "error");
            }
            return false;
          }
          var fileMultipleAttr = config.uploadImgMaxLength === 1 ? "" : 'multiple="multiple"';
          var accepts = (0, _map["default"])(_context = config.uploadImgAccept).call(_context, function(item) {
            return "image/" + item;
          }).join(",");
          var getUploadImgTpl = function getUploadImgTpl2(containerClass, iconClass, titleName) {
            return '<div class="' + containerClass + '" data-title="' + titleName + '">\n            <div id="' + upTriggerId + '" class="w-e-up-btn">\n                <i class="' + iconClass + '"></i>\n            </div>\n            <div style="display:none;">\n                <input id="' + upFileId + '" type="file" ' + fileMultipleAttr + ' accept="' + accepts + '"/>\n            </div>\n        </div>';
          };
          var uploadEvents = [
            {
              selector: "#" + upTriggerId,
              type: "click",
              fn: function fn() {
                var uploadImgFromMedia = config.uploadImgFromMedia;
                if (uploadImgFromMedia && typeof uploadImgFromMedia === "function") {
                  uploadImgFromMedia();
                  return true;
                }
                var $file = dom_core_1["default"]("#" + upFileId);
                var fileElem = $file.elems[0];
                if (fileElem) {
                  fileElem.click();
                } else {
                  return true;
                }
              }
            },
            {
              selector: "#" + upFileId,
              type: "change",
              fn: function fn() {
                var $file = dom_core_1["default"]("#" + upFileId);
                var fileElem = $file.elems[0];
                if (!fileElem) {
                  return true;
                }
                var fileList = fileElem.files;
                if (fileList === null || fileList === void 0 ? void 0 : fileList.length) {
                  uploadImg.uploadImg(fileList);
                }
                if (fileElem) {
                  fileElem.value = "";
                }
                return true;
              }
            }
          ];
          var linkImgInputs = ['<input\n            id="' + linkUrlId + '"\n            type="text"\n            class="block"\n            placeholder="' + t("\u56FE\u7247\u5730\u5740") + '"/>'];
          if (config.showLinkImgAlt) {
            linkImgInputs.push('\n        <input\n            id="' + linkUrlAltId + '"\n            type="text"\n            class="block"\n            placeholder="' + t("\u56FE\u7247\u6587\u5B57\u8BF4\u660E") + '"/>');
          }
          if (config.showLinkImgHref) {
            linkImgInputs.push('\n        <input\n            id="' + linkUrlHrefId + '"\n            type="text"\n            class="block"\n            placeholder="' + t("\u8DF3\u8F6C\u94FE\u63A5") + '"/>');
          }
          var tabsConf = [
            {
              title: t("\u4E0A\u4F20\u56FE\u7247"),
              tpl: getUploadImgTpl("w-e-up-img-container", "w-e-icon-upload2", ""),
              events: uploadEvents
            },
            {
              title: t("\u7F51\u7EDC\u56FE\u7247"),
              tpl: "<div>\n                    " + linkImgInputs.join("") + '\n                    <div class="w-e-button-container">\n                        <button type="button" id="' + linkBtnId + '" class="right">' + t("\u63D2\u5165", "") + "</button>\n                    </div>\n                </div>",
              events: [{
                selector: "#" + linkBtnId,
                type: "click",
                fn: function fn() {
                  var _context2;
                  var $linkUrl = dom_core_1["default"]("#" + linkUrlId);
                  var url = (0, _trim["default"])(_context2 = $linkUrl.val()).call(_context2);
                  if (!url)
                    return;
                  var linkUrlAltText;
                  if (config.showLinkImgAlt) {
                    var _context3;
                    linkUrlAltText = (0, _trim["default"])(_context3 = dom_core_1["default"]("#" + linkUrlAltId).val()).call(_context3);
                  }
                  var linkUrlHrefText;
                  if (config.showLinkImgHref) {
                    var _context4;
                    linkUrlHrefText = (0, _trim["default"])(_context4 = dom_core_1["default"]("#" + linkUrlHrefId).val()).call(_context4);
                  }
                  if (!checkLinkImg(url))
                    return;
                  uploadImg.insertImg(url, linkUrlAltText, linkUrlHrefText);
                  return true;
                },
                bindEnter: true
              }]
            }
          ];
          var conf = {
            width: 300,
            height: 0,
            tabs: [],
            onlyUploadConf: {
              $elem: dom_core_1["default"](getUploadImgTpl("w-e-menu", "w-e-icon-image", "\u56FE\u7247")),
              events: uploadEvents
            }
          };
          if (window.FileReader && (config.uploadImgShowBase64 || config.uploadImgServer || config.customUploadImg || config.uploadImgFromMedia)) {
            conf.tabs.push(tabsConf[0]);
          }
          if (config.showLinkImg) {
            conf.tabs.push(tabsConf[1]);
            conf.onlyUploadConf = void 0;
          }
          return conf;
        }
        exports2["default"] = default_1;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var DropListMenu_1 = tslib_1.__importDefault(__webpack_require__(24));
        var operate_element_1 = tslib_1.__importDefault(__webpack_require__(366));
        var Indent = function(_super) {
          tslib_1.__extends(Indent2, _super);
          function Indent2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u7F29\u8FDB">\n                <i class="w-e-icon-indent-increase"></i>\n            </div>');
            var dropListConf = {
              width: 130,
              title: "\u8BBE\u7F6E\u7F29\u8FDB",
              type: "list",
              list: [{
                $elem: dom_core_1["default"]('<p>\n                            <i class="w-e-icon-indent-increase w-e-drop-list-item"></i>\n                            ' + editor.i18next.t("menus.dropListMenu.indent.\u589E\u52A0\u7F29\u8FDB") + "\n                        <p>"),
                value: "increase"
              }, {
                $elem: dom_core_1["default"]('<p>\n                            <i class="w-e-icon-indent-decrease w-e-drop-list-item"></i>\n                            ' + editor.i18next.t("menus.dropListMenu.indent.\u51CF\u5C11\u7F29\u8FDB") + "\n                        <p>"),
                value: "decrease"
              }],
              clickHandler: function clickHandler(value) {
                _this.command(value);
              }
            };
            _this = _super.call(this, $elem, editor, dropListConf) || this;
            return _this;
          }
          Indent2.prototype.command = function(value) {
            var editor = this.editor;
            var $selectionElem = editor.selection.getSelectionContainerElem();
            if ($selectionElem && editor.$textElem.equal($selectionElem)) {
              var $elems = editor.selection.getSelectionRangeTopNodes();
              if ($elems.length > 0) {
                (0, _forEach["default"])($elems).call($elems, function(item) {
                  operate_element_1["default"](dom_core_1["default"](item), value, editor);
                });
              }
            } else {
              if ($selectionElem && $selectionElem.length > 0) {
                (0, _forEach["default"])($selectionElem).call($selectionElem, function(item) {
                  operate_element_1["default"](dom_core_1["default"](item), value, editor);
                });
              }
            }
            editor.selection.restoreSelection();
            this.tryChangeActive();
          };
          Indent2.prototype.tryChangeActive = function() {
            var editor = this.editor;
            var $selectionElem = editor.selection.getSelectionStartElem();
            var $selectionStartElem = dom_core_1["default"]($selectionElem).getNodeTop(editor);
            if ($selectionStartElem.length <= 0)
              return;
            if ($selectionStartElem.elems[0].style["paddingLeft"] != "") {
              this.active();
            } else {
              this.unActive();
            }
          };
          return Indent2;
        }(DropListMenu_1["default"]);
        exports2["default"] = Indent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _slice = _interopRequireDefault(__webpack_require__(45));
        var _trim = _interopRequireDefault(__webpack_require__(17));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var increase_indent_style_1 = tslib_1.__importDefault(__webpack_require__(367));
        var decrease_indent_style_1 = tslib_1.__importDefault(__webpack_require__(368));
        var lengthRegex = /^(\d+)(\w+)$/;
        var percentRegex = /^(\d+)%$/;
        function parseIndentation(editor) {
          var indentation = editor.config.indentation;
          if (typeof indentation === "string") {
            if (lengthRegex.test(indentation)) {
              var _context;
              var _a = (0, _slice["default"])(_context = (0, _trim["default"])(indentation).call(indentation).match(lengthRegex)).call(_context, 1, 3), value = _a[0], unit = _a[1];
              return {
                value: Number(value),
                unit
              };
            } else if (percentRegex.test(indentation)) {
              return {
                value: Number((0, _trim["default"])(indentation).call(indentation).match(percentRegex)[1]),
                unit: "%"
              };
            }
          } else if (indentation.value !== void 0 && indentation.unit) {
            return indentation;
          }
          return {
            value: 2,
            unit: "em"
          };
        }
        function operateElement($node, type, editor) {
          var $elem = $node.getNodeTop(editor);
          var reg = /^(P|H[0-9]*)$/;
          if (reg.test($elem.getNodeName())) {
            if (type === "increase")
              increase_indent_style_1["default"]($elem, parseIndentation(editor));
            else if (type === "decrease")
              decrease_indent_style_1["default"]($elem, parseIndentation(editor));
          }
        }
        exports2["default"] = operateElement;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _slice = _interopRequireDefault(__webpack_require__(45));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        function increaseIndentStyle($node, options) {
          var $elem = $node.elems[0];
          if ($elem.style["paddingLeft"] === "") {
            $node.css("padding-left", options.value + options.unit);
          } else {
            var oldPL = $elem.style["paddingLeft"];
            var oldVal = (0, _slice["default"])(oldPL).call(oldPL, 0, oldPL.length - options.unit.length);
            var newVal = Number(oldVal) + options.value;
            $node.css("padding-left", "" + newVal + options.unit);
          }
        }
        exports2["default"] = increaseIndentStyle;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _slice = _interopRequireDefault(__webpack_require__(45));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        function decreaseIndentStyle($node, options) {
          var $elem = $node.elems[0];
          if ($elem.style["paddingLeft"] !== "") {
            var oldPL = $elem.style["paddingLeft"];
            var oldVal = (0, _slice["default"])(oldPL).call(oldPL, 0, oldPL.length - options.unit.length);
            var newVal = Number(oldVal) - options.value;
            if (newVal > 0) {
              $node.css("padding-left", "" + newVal + options.unit);
            } else {
              $node.css("padding-left", "");
            }
          }
        }
        exports2["default"] = decreaseIndentStyle;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var PanelMenu_1 = tslib_1.__importDefault(__webpack_require__(38));
        var Panel_1 = tslib_1.__importDefault(__webpack_require__(33));
        var create_panel_conf_1 = tslib_1.__importDefault(__webpack_require__(370));
        var Emoticon = function(_super) {
          tslib_1.__extends(Emoticon2, _super);
          function Emoticon2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u8868\u60C5">\n                <i class="w-e-icon-happy"></i>\n            </div>');
            _this = _super.call(this, $elem, editor) || this;
            return _this;
          }
          Emoticon2.prototype.createPanel = function() {
            var conf = create_panel_conf_1["default"](this.editor);
            var panel = new Panel_1["default"](this, conf);
            panel.create();
          };
          Emoticon2.prototype.clickHandler = function() {
            this.createPanel();
          };
          Emoticon2.prototype.tryChangeActive = function() {
          };
          return Emoticon2;
        }(PanelMenu_1["default"]);
        exports2["default"] = Emoticon;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _map = _interopRequireDefault(__webpack_require__(26));
        var _filter = _interopRequireDefault(__webpack_require__(70));
        var _trim = _interopRequireDefault(__webpack_require__(17));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        function default_1(editor) {
          var emotions = editor.config.emotions;
          function GenerateExpressionStructure(ele) {
            var res = [];
            if (ele.type == "image") {
              var _context;
              res = (0, _map["default"])(_context = ele.content).call(_context, function(con) {
                if (typeof con == "string")
                  return "";
                return '<span  title="' + con.alt + '">\n                    <img class="eleImg" data-emoji="' + con.alt + '" style src="' + con.src + '" alt="[' + con.alt + ']">\n                </span>';
              });
              res = (0, _filter["default"])(res).call(res, function(s) {
                return s !== "";
              });
            } else {
              var _context2;
              res = (0, _map["default"])(_context2 = ele.content).call(_context2, function(con) {
                return '<span class="eleImg" title="' + con + '">' + con + "</span>";
              });
            }
            return res.join("").replace(/&nbsp;/g, "");
          }
          var tabsConf = (0, _map["default"])(emotions).call(emotions, function(ele) {
            return {
              title: editor.i18next.t("menus.panelMenus.emoticon." + ele.title),
              tpl: "<div>" + GenerateExpressionStructure(ele) + "</div>",
              events: [{
                selector: ".eleImg",
                type: "click",
                fn: function fn(e) {
                  var $target = dom_core_1["default"](e.target);
                  var nodeName = $target.getNodeName();
                  var insertHtml;
                  if (nodeName === "IMG") {
                    var _context3;
                    insertHtml = (0, _trim["default"])(_context3 = $target.parent().html()).call(_context3);
                  } else {
                    insertHtml = "<span>" + $target.html() + "</span>";
                  }
                  editor.cmd["do"]("insertHTML", insertHtml);
                  return true;
                }
              }]
            };
          });
          var conf = {
            width: 300,
            height: 230,
            tabs: tabsConf
          };
          return conf;
        }
        exports2["default"] = default_1;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.createListHandle = exports2.ClassType = void 0;
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var WrapListHandle_1 = tslib_1.__importDefault(__webpack_require__(372));
        var JoinListHandle_1 = tslib_1.__importDefault(__webpack_require__(374));
        var StartJoinListHandle_1 = tslib_1.__importDefault(__webpack_require__(375));
        var EndJoinListHandle_1 = tslib_1.__importDefault(__webpack_require__(376));
        var OtherListHandle_1 = tslib_1.__importDefault(__webpack_require__(377));
        var ClassType;
        (function(ClassType2) {
          ClassType2["Wrap"] = "WrapListHandle";
          ClassType2["Join"] = "JoinListHandle";
          ClassType2["StartJoin"] = "StartJoinListHandle";
          ClassType2["EndJoin"] = "EndJoinListHandle";
          ClassType2["Other"] = "OtherListHandle";
        })(ClassType = exports2.ClassType || (exports2.ClassType = {}));
        var handle = {
          WrapListHandle: WrapListHandle_1["default"],
          JoinListHandle: JoinListHandle_1["default"],
          StartJoinListHandle: StartJoinListHandle_1["default"],
          EndJoinListHandle: EndJoinListHandle_1["default"],
          OtherListHandle: OtherListHandle_1["default"]
        };
        function createListHandle(classType, options, range) {
          if (classType === ClassType.Other && range === void 0) {
            throw new Error("other \u7C7B\u9700\u8981\u4F20\u5165 range");
          }
          return classType !== ClassType.Other ? new handle[classType](options) : new handle[classType](options, range);
        }
        exports2.createListHandle = createListHandle;
        var ListHandleCommand = function() {
          function ListHandleCommand2(handle2) {
            this.handle = handle2;
            this.handle.exec();
          }
          ListHandleCommand2.prototype.getSelectionRangeElem = function() {
            return dom_core_1["default"](this.handle.selectionRangeElem.get());
          };
          return ListHandleCommand2;
        }();
        exports2["default"] = ListHandleCommand;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var ListHandle_1 = __webpack_require__(58);
        var utils_1 = __webpack_require__(47);
        var WrapListHandle = function(_super) {
          tslib_1.__extends(WrapListHandle2, _super);
          function WrapListHandle2(options) {
            return _super.call(this, options) || this;
          }
          WrapListHandle2.prototype.exec = function() {
            var _a = this.options, listType = _a.listType, listTarget = _a.listTarget, $selectionElem = _a.$selectionElem, $startElem = _a.$startElem, $endElem = _a.$endElem;
            var $containerFragment;
            var $nodes = [];
            var containerNodeName = $selectionElem === null || $selectionElem === void 0 ? void 0 : $selectionElem.getNodeName();
            var $start = $startElem.prior;
            var $end = $endElem.prior;
            if (!$startElem.prior && !$endElem.prior || !($start === null || $start === void 0 ? void 0 : $start.prev().length) && !($end === null || $end === void 0 ? void 0 : $end.next().length)) {
              var _context;
              (0, _forEach["default"])(_context = $selectionElem === null || $selectionElem === void 0 ? void 0 : $selectionElem.children()).call(_context, function($node) {
                $nodes.push(dom_core_1["default"]($node));
              });
              if (containerNodeName === listType) {
                $containerFragment = utils_1.createElementFragment($nodes, utils_1.createDocumentFragment(), "p");
              } else {
                $containerFragment = utils_1.createElement(listTarget);
                (0, _forEach["default"])($nodes).call($nodes, function($node) {
                  $containerFragment.appendChild($node.elems[0]);
                });
              }
              this.selectionRangeElem.set($containerFragment);
              utils_1.insertBefore($selectionElem, $containerFragment, $selectionElem.elems[0]);
              $selectionElem.remove();
            } else {
              var $startDom = $start;
              while ($startDom.length) {
                $nodes.push($startDom);
                ($end === null || $end === void 0 ? void 0 : $end.equal($startDom)) ? $startDom = dom_core_1["default"](void 0) : $startDom = $startDom.next();
              }
              var $prveDom = $start.prev();
              var $nextDom = $end.next();
              if (containerNodeName === listType) {
                $containerFragment = utils_1.createElementFragment($nodes, utils_1.createDocumentFragment(), "p");
              } else {
                $containerFragment = utils_1.createElement(listTarget);
                (0, _forEach["default"])($nodes).call($nodes, function($node) {
                  $containerFragment.append($node.elems[0]);
                });
              }
              if ($prveDom.length && $nextDom.length) {
                var $tailDomArr = [];
                while ($nextDom.length) {
                  $tailDomArr.push($nextDom);
                  $nextDom = $nextDom.next();
                }
                var $tailDocFragment_1 = utils_1.createElement(containerNodeName);
                (0, _forEach["default"])($tailDomArr).call($tailDomArr, function($node) {
                  $tailDocFragment_1.append($node.elems[0]);
                });
                dom_core_1["default"]($tailDocFragment_1).insertAfter($selectionElem);
                this.selectionRangeElem.set($containerFragment);
                var $selectionNextDom = $selectionElem.next();
                $selectionNextDom.length ? utils_1.insertBefore($selectionElem, $containerFragment, $selectionNextDom.elems[0]) : $selectionElem.parent().elems[0].append($containerFragment);
              } else if (!$prveDom.length) {
                this.selectionRangeElem.set($containerFragment);
                utils_1.insertBefore($selectionElem, $containerFragment, $selectionElem.elems[0]);
              } else {
                this.selectionRangeElem.set($containerFragment);
                var $selectionNextDom = $selectionElem.next();
                $selectionNextDom.length ? utils_1.insertBefore($selectionElem, $containerFragment, $selectionNextDom.elems[0]) : $selectionElem.parent().elems[0].append($containerFragment);
              }
            }
          };
          return WrapListHandle2;
        }(ListHandle_1.ListHandle);
        exports2["default"] = WrapListHandle;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var SelectionRangeElem = function() {
          function SelectionRangeElem2() {
            this._element = null;
          }
          SelectionRangeElem2.prototype.set = function(data) {
            if (data instanceof DocumentFragment) {
              var _context;
              var childNode_1 = [];
              (0, _forEach["default"])(_context = data.childNodes).call(_context, function($node) {
                childNode_1.push($node);
              });
              data = childNode_1;
            }
            this._element = data;
          };
          SelectionRangeElem2.prototype.get = function() {
            return this._element;
          };
          SelectionRangeElem2.prototype.clear = function() {
            this._element = null;
          };
          return SelectionRangeElem2;
        }();
        exports2["default"] = SelectionRangeElem;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var ListHandle_1 = __webpack_require__(58);
        var utils_1 = __webpack_require__(47);
        var JoinListHandle = function(_super) {
          tslib_1.__extends(JoinListHandle2, _super);
          function JoinListHandle2(options) {
            return _super.call(this, options) || this;
          }
          JoinListHandle2.prototype.exec = function() {
            var _a, _b, _c, _d, _e, _f, _g;
            var _h = this.options, editor = _h.editor, listType = _h.listType, listTarget = _h.listTarget, $startElem = _h.$startElem, $endElem = _h.$endElem;
            var $containerFragment;
            var $nodes = editor.selection.getSelectionRangeTopNodes();
            var startNodeName = $startElem === null || $startElem === void 0 ? void 0 : $startElem.getNodeName();
            var endNodeName = $endElem === null || $endElem === void 0 ? void 0 : $endElem.getNodeName();
            if (startNodeName === endNodeName) {
              if ($nodes.length > 2) {
                $nodes.shift();
                $nodes.pop();
                $containerFragment = utils_1.createElementFragment(utils_1.filterSelectionNodes($nodes), utils_1.createDocumentFragment());
                if (startNodeName === listType) {
                  (_a = $endElem.children()) === null || _a === void 0 ? void 0 : (0, _forEach["default"])(_a).call(_a, function($list) {
                    $containerFragment.append($list);
                  });
                  $endElem.remove();
                  this.selectionRangeElem.set($containerFragment);
                  $startElem.elems[0].append($containerFragment);
                } else {
                  var $startFragment = document.createDocumentFragment();
                  var $endFragment_1 = document.createDocumentFragment();
                  var $startDom = utils_1.getStartPoint($startElem);
                  while ($startDom.length) {
                    var _element = $startDom.elems[0];
                    $startDom = $startDom.next();
                    $startFragment.append(_element);
                  }
                  var $endDom = utils_1.getEndPoint($endElem);
                  var domArr = [];
                  while ($endDom.length) {
                    domArr.unshift($endDom.elems[0]);
                    $endDom = $endDom.prev();
                  }
                  (0, _forEach["default"])(domArr).call(domArr, function($node) {
                    $endFragment_1.append($node);
                  });
                  var $orderFragment = utils_1.createElement(listTarget);
                  $orderFragment.append($startFragment);
                  $orderFragment.append($containerFragment);
                  $orderFragment.append($endFragment_1);
                  $containerFragment = $orderFragment;
                  this.selectionRangeElem.set($containerFragment);
                  dom_core_1["default"]($orderFragment).insertAfter($startElem);
                  !((_b = $startElem.children()) === null || _b === void 0 ? void 0 : _b.length) && $startElem.remove();
                  !((_c = $endElem.children()) === null || _c === void 0 ? void 0 : _c.length) && $endElem.remove();
                }
              } else {
                $nodes.length = 0;
                var $startDom = utils_1.getStartPoint($startElem);
                while ($startDom.length) {
                  $nodes.push($startDom);
                  $startDom = $startDom.next();
                }
                var $endDom = utils_1.getEndPoint($endElem);
                var domArr = [];
                while ($endDom.length) {
                  domArr.unshift($endDom);
                  $endDom = $endDom.prev();
                }
                $nodes.push.apply($nodes, domArr);
                if (startNodeName === listType) {
                  $containerFragment = utils_1.createElementFragment($nodes, utils_1.createDocumentFragment(), "p");
                  this.selectionRangeElem.set($containerFragment);
                  utils_1.insertBefore($startElem, $containerFragment, $endElem.elems[0]);
                } else {
                  $containerFragment = utils_1.createElement(listTarget);
                  (0, _forEach["default"])($nodes).call($nodes, function($list) {
                    $containerFragment.append($list.elems[0]);
                  });
                  this.selectionRangeElem.set($containerFragment);
                  dom_core_1["default"]($containerFragment).insertAfter($startElem);
                }
                !((_d = $startElem.children()) === null || _d === void 0 ? void 0 : _d.length) && $endElem.remove();
                !((_e = $endElem.children()) === null || _e === void 0 ? void 0 : _e.length) && $endElem.remove();
              }
            } else {
              var lowerListElems = [];
              var $endDom = utils_1.getEndPoint($endElem);
              while ($endDom.length) {
                lowerListElems.unshift($endDom);
                $endDom = $endDom.prev();
              }
              var upperListElems = [];
              var $startDom = utils_1.getStartPoint($startElem);
              while ($startDom.length) {
                upperListElems.push($startDom);
                $startDom = $startDom.next();
              }
              $containerFragment = utils_1.createDocumentFragment();
              $nodes.shift();
              $nodes.pop();
              (0, _forEach["default"])(upperListElems).call(upperListElems, function($list) {
                return $containerFragment.append($list.elems[0]);
              });
              $containerFragment = utils_1.createElementFragment(utils_1.filterSelectionNodes($nodes), $containerFragment);
              (0, _forEach["default"])(lowerListElems).call(lowerListElems, function($list) {
                return $containerFragment.append($list.elems[0]);
              });
              this.selectionRangeElem.set($containerFragment);
              if (startNodeName === listType) {
                $startElem.elems[0].append($containerFragment);
                !((_f = $endElem.children()) === null || _f === void 0 ? void 0 : _f.length) && $endElem.remove();
              } else {
                if ((_g = $endElem.children()) === null || _g === void 0 ? void 0 : _g.length) {
                  var $endElemChild = $endElem.children();
                  utils_1.insertBefore($endElemChild, $containerFragment, $endElemChild.elems[0]);
                } else {
                  $endElem.elems[0].append($containerFragment);
                }
              }
            }
          };
          return JoinListHandle2;
        }(ListHandle_1.ListHandle);
        exports2["default"] = JoinListHandle;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var ListHandle_1 = __webpack_require__(58);
        var utils_1 = __webpack_require__(47);
        var StartJoinListHandle = function(_super) {
          tslib_1.__extends(StartJoinListHandle2, _super);
          function StartJoinListHandle2(options) {
            return _super.call(this, options) || this;
          }
          StartJoinListHandle2.prototype.exec = function() {
            var _a;
            var _b = this.options, editor = _b.editor, listType = _b.listType, listTarget = _b.listTarget, $startElem = _b.$startElem;
            var $containerFragment;
            var $nodes = editor.selection.getSelectionRangeTopNodes();
            var startNodeName = $startElem === null || $startElem === void 0 ? void 0 : $startElem.getNodeName();
            $nodes.shift();
            var upperListElems = [];
            var $startDom = utils_1.getStartPoint($startElem);
            while ($startDom.length) {
              upperListElems.push($startDom);
              $startDom = $startDom.next();
            }
            if (startNodeName === listType) {
              $containerFragment = utils_1.createDocumentFragment();
              (0, _forEach["default"])(upperListElems).call(upperListElems, function($list) {
                return $containerFragment.append($list.elems[0]);
              });
              $containerFragment = utils_1.createElementFragment(utils_1.filterSelectionNodes($nodes), $containerFragment);
              this.selectionRangeElem.set($containerFragment);
              $startElem.elems[0].append($containerFragment);
            } else {
              $containerFragment = utils_1.createElement(listTarget);
              (0, _forEach["default"])(upperListElems).call(upperListElems, function($list) {
                return $containerFragment.append($list.elems[0]);
              });
              $containerFragment = utils_1.createElementFragment(utils_1.filterSelectionNodes($nodes), $containerFragment);
              this.selectionRangeElem.set($containerFragment);
              dom_core_1["default"]($containerFragment).insertAfter($startElem);
              !((_a = $startElem.children()) === null || _a === void 0 ? void 0 : _a.length) && $startElem.remove();
            }
          };
          return StartJoinListHandle2;
        }(ListHandle_1.ListHandle);
        exports2["default"] = StartJoinListHandle;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var ListHandle_1 = __webpack_require__(58);
        var utils_1 = __webpack_require__(47);
        var EndJoinListHandle = function(_super) {
          tslib_1.__extends(EndJoinListHandle2, _super);
          function EndJoinListHandle2(options) {
            return _super.call(this, options) || this;
          }
          EndJoinListHandle2.prototype.exec = function() {
            var _a, _b;
            var _c = this.options, editor = _c.editor, listType = _c.listType, listTarget = _c.listTarget, $endElem = _c.$endElem;
            var $containerFragment;
            var $nodes = editor.selection.getSelectionRangeTopNodes();
            var endNodeName = $endElem === null || $endElem === void 0 ? void 0 : $endElem.getNodeName();
            $nodes.pop();
            var lowerListElems = [];
            var $endDom = utils_1.getEndPoint($endElem);
            while ($endDom.length) {
              lowerListElems.unshift($endDom);
              $endDom = $endDom.prev();
            }
            if (endNodeName === listType) {
              $containerFragment = utils_1.createElementFragment(utils_1.filterSelectionNodes($nodes), utils_1.createDocumentFragment());
              (0, _forEach["default"])(lowerListElems).call(lowerListElems, function($list) {
                return $containerFragment.append($list.elems[0]);
              });
              this.selectionRangeElem.set($containerFragment);
              if ((_a = $endElem.children()) === null || _a === void 0 ? void 0 : _a.length) {
                var $endElemChild = $endElem.children();
                utils_1.insertBefore($endElemChild, $containerFragment, $endElemChild.elems[0]);
              } else {
                $endElem.elems[0].append($containerFragment);
              }
            } else {
              var $selectionNodes = utils_1.filterSelectionNodes($nodes);
              $selectionNodes.push.apply($selectionNodes, lowerListElems);
              $containerFragment = utils_1.createElementFragment($selectionNodes, utils_1.createElement(listTarget));
              this.selectionRangeElem.set($containerFragment);
              dom_core_1["default"]($containerFragment).insertBefore($endElem);
              !((_b = $endElem.children()) === null || _b === void 0 ? void 0 : _b.length) && $endElem.remove();
            }
          };
          return EndJoinListHandle2;
        }(ListHandle_1.ListHandle);
        exports2["default"] = EndJoinListHandle;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var ListHandle_1 = __webpack_require__(58);
        var utils_1 = __webpack_require__(47);
        var OtherListHandle = function(_super) {
          tslib_1.__extends(OtherListHandle2, _super);
          function OtherListHandle2(options, range) {
            var _this = _super.call(this, options) || this;
            _this.range = range;
            return _this;
          }
          OtherListHandle2.prototype.exec = function() {
            var _a = this.options, editor = _a.editor, listTarget = _a.listTarget;
            var $nodes = editor.selection.getSelectionRangeTopNodes();
            var $containerFragment = utils_1.createElementFragment(utils_1.filterSelectionNodes($nodes), utils_1.createElement(listTarget));
            this.selectionRangeElem.set($containerFragment);
            this.range.insertNode($containerFragment);
          };
          return OtherListHandle2;
        }(ListHandle_1.ListHandle);
        exports2["default"] = OtherListHandle;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _indexOf = _interopRequireDefault(__webpack_require__(27));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var DropListMenu_1 = tslib_1.__importDefault(__webpack_require__(24));
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var lineHeightList_1 = tslib_1.__importDefault(__webpack_require__(379));
        var LineHeight = function(_super) {
          tslib_1.__extends(LineHeight2, _super);
          function LineHeight2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u884C\u9AD8">\n                    <i class="w-e-icon-row-height"></i>\n                </div>');
            var lineHeightMenu = new lineHeightList_1["default"](editor, editor.config.lineHeights);
            var DropListMenu = {
              width: 100,
              title: "\u8BBE\u7F6E\u884C\u9AD8",
              type: "list",
              list: lineHeightMenu.getItemList(),
              clickHandler: function clickHandler(value) {
                editor.selection.saveRange();
                _this.command(value);
              }
            };
            _this = _super.call(this, $elem, editor, DropListMenu) || this;
            return _this;
          }
          LineHeight2.prototype.command = function(value) {
            var editor = this.editor;
            editor.selection.restoreSelection();
            var $containerElem = dom_core_1["default"](editor.selection.getSelectionContainerElem());
            if (!$containerElem.elems.length)
              return;
            if ($containerElem && editor.$textElem.equal($containerElem)) {
              var setStyleLock = false;
              var selectionStartElem = dom_core_1["default"](editor.selection.getSelectionStartElem()).elems[0];
              var SelectionEndElem = dom_core_1["default"](editor.selection.getSelectionEndElem()).elems[0];
              var StartElemWrap = this.getDom(selectionStartElem);
              var EndElemWrap = this.getDom(SelectionEndElem);
              var containerElemChildren = $containerElem.elems[0].children;
              for (var i = 0; i < containerElemChildren.length; i++) {
                var item = containerElemChildren[i];
                if (dom_core_1["default"](item).getNodeName() !== "P") {
                  continue;
                }
                if (item === StartElemWrap) {
                  setStyleLock = true;
                }
                if (setStyleLock) {
                  dom_core_1["default"](item).css("line-height", value);
                  if (item === EndElemWrap) {
                    setStyleLock = false;
                    return;
                  }
                }
              }
              editor.selection.createRangeByElems(selectionStartElem, SelectionEndElem);
              return;
            }
            var selectElem = $containerElem.elems[0];
            var selectElemWrapdom = this.getDom(selectElem);
            if (dom_core_1["default"](selectElemWrapdom).getNodeName() !== "P") {
              return;
            }
            dom_core_1["default"](selectElemWrapdom).css("line-height", value);
            editor.selection.createRangeByElems(selectElemWrapdom, selectElemWrapdom);
            return;
          };
          LineHeight2.prototype.getDom = function(dom) {
            var DOM = dom_core_1["default"](dom).elems[0];
            if (!DOM.parentNode) {
              return DOM;
            }
            function getParentNode($node, editor) {
              var $parent = dom_core_1["default"]($node.parentNode);
              if (editor.$textElem.equal($parent)) {
                return $node;
              } else {
                return getParentNode($parent.elems[0], editor);
              }
            }
            DOM = getParentNode(DOM, this.editor);
            return DOM;
          };
          LineHeight2.prototype.styleProcessing = function(styleList) {
            var styleStr = "";
            (0, _forEach["default"])(styleList).call(styleList, function(item) {
              item !== "" && (0, _indexOf["default"])(item).call(item, "line-height") === -1 ? styleStr = styleStr + item + ";" : "";
            });
            return styleStr;
          };
          LineHeight2.prototype.setRange = function(startDom, endDom) {
            var editor = this.editor;
            var selection = window.getSelection ? window.getSelection() : document.getSelection();
            selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
            var range = document.createRange();
            var star = startDom;
            var end = endDom;
            range.setStart(star, 0);
            range.setEnd(end, 1);
            selection === null || selection === void 0 ? void 0 : selection.addRange(range);
            editor.selection.saveRange();
            selection === null || selection === void 0 ? void 0 : selection.removeAllRanges();
            editor.selection.restoreSelection();
          };
          LineHeight2.prototype.tryChangeActive = function() {
            var editor = this.editor;
            var $selectionElem = editor.selection.getSelectionContainerElem();
            if ($selectionElem && editor.$textElem.equal($selectionElem)) {
              return;
            }
            var dom = dom_core_1["default"](editor.selection.getSelectionStartElem());
            if (dom.length === 0)
              return;
            dom = this.getDom(dom.elems[0]);
            var style = dom.getAttribute("style") ? dom.getAttribute("style") : "";
            if (style && (0, _indexOf["default"])(style).call(style, "line-height") !== -1) {
              this.active();
            } else {
              this.unActive();
            }
          };
          return LineHeight2;
        }(DropListMenu_1["default"]);
        exports2["default"] = LineHeight;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var lineHeightList = function() {
          function lineHeightList2(editor, list) {
            var _this = this;
            this.itemList = [{
              $elem: dom_core_1["default"]("<span>" + editor.i18next.t("\u9ED8\u8BA4") + "</span>"),
              value: ""
            }];
            (0, _forEach["default"])(list).call(list, function(item) {
              _this.itemList.push({
                $elem: dom_core_1["default"]("<span>" + item + "</span>"),
                value: item
              });
            });
          }
          lineHeightList2.prototype.getItemList = function() {
            return this.itemList;
          };
          return lineHeightList2;
        }();
        exports2["default"] = lineHeightList;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var BtnMenu_1 = tslib_1.__importDefault(__webpack_require__(23));
        var Undo = function(_super) {
          tslib_1.__extends(Undo2, _super);
          function Undo2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u64A4\u9500">\n                <i class="w-e-icon-undo"></i>\n            </div>');
            _this = _super.call(this, $elem, editor) || this;
            return _this;
          }
          Undo2.prototype.clickHandler = function() {
            var editor = this.editor;
            editor.history.revoke();
            var children = editor.$textElem.children();
            if (!(children === null || children === void 0 ? void 0 : children.length))
              return;
            var $last = children.last();
            editor.selection.createRangeByElem($last, false, true);
            editor.selection.restoreSelection();
          };
          Undo2.prototype.tryChangeActive = function() {
            if (!this.editor.isCompatibleMode) {
              if (this.editor.history.size[0]) {
                this.active();
              } else {
                this.unActive();
              }
            }
          };
          return Undo2;
        }(BtnMenu_1["default"]);
        exports2["default"] = Undo;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var BtnMenu_1 = tslib_1.__importDefault(__webpack_require__(23));
        var Redo = function(_super) {
          tslib_1.__extends(Redo2, _super);
          function Redo2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u6062\u590D">\n                <i class="w-e-icon-redo"></i>\n            </div>');
            _this = _super.call(this, $elem, editor) || this;
            return _this;
          }
          Redo2.prototype.clickHandler = function() {
            var editor = this.editor;
            editor.history.restore();
            var children = editor.$textElem.children();
            if (!(children === null || children === void 0 ? void 0 : children.length))
              return;
            var $last = children.last();
            editor.selection.createRangeByElem($last, false, true);
            editor.selection.restoreSelection();
          };
          Redo2.prototype.tryChangeActive = function() {
            if (!this.editor.isCompatibleMode) {
              if (this.editor.history.size[1]) {
                this.active();
              } else {
                this.unActive();
              }
            }
          };
          return Redo2;
        }(BtnMenu_1["default"]);
        exports2["default"] = Redo;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var PanelMenu_1 = tslib_1.__importDefault(__webpack_require__(38));
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var create_panel_conf_1 = tslib_1.__importDefault(__webpack_require__(383));
        var Panel_1 = tslib_1.__importDefault(__webpack_require__(33));
        var index_1 = tslib_1.__importDefault(__webpack_require__(392));
        var Table = function(_super) {
          tslib_1.__extends(Table2, _super);
          function Table2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u8868\u683C"><i class="w-e-icon-table2"></i></div>');
            _this = _super.call(this, $elem, editor) || this;
            index_1["default"](editor);
            return _this;
          }
          Table2.prototype.clickHandler = function() {
            this.createPanel();
          };
          Table2.prototype.createPanel = function() {
            var conf = create_panel_conf_1["default"](this.editor);
            var panel = new Panel_1["default"](this, conf);
            panel.create();
          };
          Table2.prototype.tryChangeActive = function() {
          };
          return Table2;
        }(PanelMenu_1["default"]);
        exports2["default"] = Table;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _isInteger = _interopRequireDefault(__webpack_require__(384));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var util_1 = __webpack_require__(6);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        __webpack_require__(389);
        var create_table_1 = tslib_1.__importDefault(__webpack_require__(391));
        function isPositiveInteger(n) {
          return n > 0 && (0, _isInteger["default"])(n);
        }
        function default_1(editor) {
          var createTable = new create_table_1["default"](editor);
          var colId = util_1.getRandom("w-col-id");
          var rowId = util_1.getRandom("w-row-id");
          var insertBtnId = util_1.getRandom("btn-link");
          var i18nPrefix = "menus.panelMenus.table.";
          var t = function t2(text) {
            return editor.i18next.t(text);
          };
          var tabsConf = [{
            title: t(i18nPrefix + "\u63D2\u5165\u8868\u683C"),
            tpl: '<div>\n                    <div class="w-e-table">\n                        <span>' + t("\u521B\u5EFA") + '</span>\n                        <input id="' + rowId + '"  type="text" class="w-e-table-input" value="5"/></td>\n                        <span>' + t(i18nPrefix + "\u884C") + '</span>\n                        <input id="' + colId + '" type="text" class="w-e-table-input" value="5"/></td>\n                        <span>' + (t(i18nPrefix + "\u5217") + t(i18nPrefix + "\u7684") + t(i18nPrefix + "\u8868\u683C")) + '</span>\n                    </div>\n                    <div class="w-e-button-container">\n                        <button type="button" id="' + insertBtnId + '" class="right">' + t("\u63D2\u5165") + "</button>\n                    </div>\n                </div>",
            events: [{
              selector: "#" + insertBtnId,
              type: "click",
              fn: function fn() {
                var colValue = Number(dom_core_1["default"]("#" + colId).val());
                var rowValue = Number(dom_core_1["default"]("#" + rowId).val());
                if (isPositiveInteger(rowValue) && isPositiveInteger(colValue)) {
                  createTable.createAction(rowValue, colValue);
                  return true;
                } else {
                  editor.config.customAlert("\u8868\u683C\u884C\u5217\u8BF7\u8F93\u5165\u6B63\u6574\u6570", "warning");
                  return false;
                }
              },
              bindEnter: true
            }]
          }];
          var conf = {
            width: 330,
            height: 0,
            tabs: []
          };
          conf.tabs.push(tabsConf[0]);
          return conf;
        }
        exports2["default"] = default_1;
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(385);
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(386);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(387);
        var path = __webpack_require__(9);
        module2.exports = path.Number.isInteger;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var isInteger = __webpack_require__(388);
        $({ target: "Number", stat: true }, {
          isInteger
        });
      },
      function(module2, exports2, __webpack_require__) {
        var isObject2 = __webpack_require__(13);
        var floor = Math.floor;
        module2.exports = function isInteger(it) {
          return !isObject2(it) && isFinite(it) && floor(it) === it;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var api = __webpack_require__(20);
        var content = __webpack_require__(390);
        content = content.__esModule ? content.default : content;
        if (typeof content === "string") {
          content = [[module2.i, content, ""]];
        }
        var options = {};
        options.insert = "head";
        options.singleton = false;
        api(content, options);
        module2.exports = content.locals || {};
      },
      function(module2, exports2, __webpack_require__) {
        var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(21);
        exports2 = ___CSS_LOADER_API_IMPORT___(false);
        exports2.push([module2.i, ".w-e-table {\n  display: flex;\n}\n.w-e-table .w-e-table-input {\n  width: 40px;\n  text-align: center!important;\n  margin: 0 5px;\n}\n", ""]);
        module2.exports = exports2;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var const_1 = __webpack_require__(7);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var CreateTable = function() {
          function CreateTable2(editor) {
            this.editor = editor;
          }
          CreateTable2.prototype.createAction = function(rowValue, colValue) {
            var editor = this.editor;
            var $selectionElem = dom_core_1["default"](editor.selection.getSelectionContainerElem());
            var $ul = dom_core_1["default"]($selectionElem.elems[0]).parentUntilEditor("UL", editor);
            var $ol = dom_core_1["default"]($selectionElem.elems[0]).parentUntilEditor("OL", editor);
            if ($ul || $ol) {
              return;
            }
            var tableDom = this.createTableHtml(rowValue, colValue);
            editor.cmd["do"]("insertHTML", tableDom);
          };
          CreateTable2.prototype.createTableHtml = function(rowValue, colValue) {
            var rowStr = "";
            var colStr = "";
            for (var i = 0; i < rowValue; i++) {
              colStr = "";
              for (var j = 0; j < colValue; j++) {
                if (i === 0) {
                  colStr = colStr + "<th></th>";
                } else {
                  colStr = colStr + "<td></td>";
                }
              }
              rowStr = rowStr + "<tr>" + colStr + "</tr>";
            }
            var tableDom = '<table border="0" width="100%" cellpadding="0" cellspacing="0"><tbody>' + rowStr + ("</tbody></table>" + const_1.EMPTY_P);
            return tableDom;
          };
          return CreateTable2;
        }();
        exports2["default"] = CreateTable;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var tooltip_event_1 = tslib_1.__importDefault(__webpack_require__(393));
        var table_event_1 = __webpack_require__(400);
        function bindEvent(editor) {
          tooltip_event_1["default"](editor);
          table_event_1.bindEventKeyboardEvent(editor);
          table_event_1.bindClickEvent(editor);
        }
        exports2["default"] = bindEvent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var Tooltip_1 = tslib_1.__importDefault(__webpack_require__(39));
        var operating_event_1 = tslib_1.__importDefault(__webpack_require__(394));
        var getNode_1 = tslib_1.__importDefault(__webpack_require__(399));
        var const_1 = __webpack_require__(7);
        function createShowHideFn(editor) {
          var tooltip;
          function showTableTooltip($node) {
            var getnode = new getNode_1["default"](editor);
            var i18nPrefix = "menus.panelMenus.table.";
            var t = function t2(text, prefix) {
              if (prefix === void 0) {
                prefix = i18nPrefix;
              }
              return editor.i18next.t(prefix + text);
            };
            var conf = [{
              $elem: dom_core_1["default"]("<span>" + t("\u5220\u9664\u8868\u683C") + "</span>"),
              onClick: function onClick(editor2, $node2) {
                editor2.selection.createRangeByElem($node2);
                editor2.selection.restoreSelection();
                editor2.cmd["do"]("insertHTML", const_1.EMPTY_P);
                return true;
              }
            }, {
              $elem: dom_core_1["default"]("<span>" + t("\u6DFB\u52A0\u884C") + "</span>"),
              onClick: function onClick(editor2, $node2) {
                var isMore = isMoreRowAction(editor2);
                if (isMore) {
                  return true;
                }
                var selectDom = dom_core_1["default"](editor2.selection.getSelectionStartElem());
                var $currentRow = getnode.getRowNode(selectDom.elems[0]);
                if (!$currentRow) {
                  return true;
                }
                var index2 = Number(getnode.getCurrentRowIndex($node2.elems[0], $currentRow));
                var htmlStr = getnode.getTableHtml($node2.elems[0]);
                var newdom = getnode.getTableHtml(operating_event_1["default"].ProcessingRow(dom_core_1["default"](htmlStr), index2).elems[0]);
                newdom = _isEmptyP($node2, newdom);
                editor2.selection.createRangeByElem($node2);
                editor2.selection.restoreSelection();
                editor2.cmd["do"]("insertHTML", newdom);
                return true;
              }
            }, {
              $elem: dom_core_1["default"]("<span>" + t("\u5220\u9664\u884C") + "</span>"),
              onClick: function onClick(editor2, $node2) {
                var isMore = isMoreRowAction(editor2);
                if (isMore) {
                  return true;
                }
                var selectDom = dom_core_1["default"](editor2.selection.getSelectionStartElem());
                var $currentRow = getnode.getRowNode(selectDom.elems[0]);
                if (!$currentRow) {
                  return true;
                }
                var index2 = Number(getnode.getCurrentRowIndex($node2.elems[0], $currentRow));
                var htmlStr = getnode.getTableHtml($node2.elems[0]);
                var trLength = operating_event_1["default"].DeleteRow(dom_core_1["default"](htmlStr), index2).elems[0].children[0].children.length;
                var newdom = "";
                editor2.selection.createRangeByElem($node2);
                editor2.selection.restoreSelection();
                if (trLength === 0) {
                  newdom = const_1.EMPTY_P;
                } else {
                  newdom = getnode.getTableHtml(operating_event_1["default"].DeleteRow(dom_core_1["default"](htmlStr), index2).elems[0]);
                }
                newdom = _isEmptyP($node2, newdom);
                editor2.cmd["do"]("insertHTML", newdom);
                return true;
              }
            }, {
              $elem: dom_core_1["default"]("<span>" + t("\u6DFB\u52A0\u5217") + "</span>"),
              onClick: function onClick(editor2, $node2) {
                var isMore = isMoreRowAction(editor2);
                if (isMore) {
                  return true;
                }
                var selectDom = dom_core_1["default"](editor2.selection.getSelectionStartElem());
                var index2 = getnode.getCurrentColIndex(selectDom.elems[0]);
                var htmlStr = getnode.getTableHtml($node2.elems[0]);
                var newdom = getnode.getTableHtml(operating_event_1["default"].ProcessingCol(dom_core_1["default"](htmlStr), index2).elems[0]);
                newdom = _isEmptyP($node2, newdom);
                editor2.selection.createRangeByElem($node2);
                editor2.selection.restoreSelection();
                editor2.cmd["do"]("insertHTML", newdom);
                return true;
              }
            }, {
              $elem: dom_core_1["default"]("<span>" + t("\u5220\u9664\u5217") + "</span>"),
              onClick: function onClick(editor2, $node2) {
                var isMore = isMoreRowAction(editor2);
                if (isMore) {
                  return true;
                }
                var selectDom = dom_core_1["default"](editor2.selection.getSelectionStartElem());
                var index2 = getnode.getCurrentColIndex(selectDom.elems[0]);
                var htmlStr = getnode.getTableHtml($node2.elems[0]);
                var newDom = operating_event_1["default"].DeleteCol(dom_core_1["default"](htmlStr), index2);
                var tdLength = newDom.elems[0].children[0].children[0].children.length;
                var newdom = "";
                editor2.selection.createRangeByElem($node2);
                editor2.selection.restoreSelection();
                if (tdLength === 0) {
                  newdom = const_1.EMPTY_P;
                } else {
                  newdom = getnode.getTableHtml(newDom.elems[0]);
                }
                newdom = _isEmptyP($node2, newdom);
                editor2.cmd["do"]("insertHTML", newdom);
                return true;
              }
            }, {
              $elem: dom_core_1["default"]("<span>" + t("\u8BBE\u7F6E\u8868\u5934") + "</span>"),
              onClick: function onClick(editor2, $node2) {
                var isMore = isMoreRowAction(editor2);
                if (isMore) {
                  return true;
                }
                var selectDom = dom_core_1["default"](editor2.selection.getSelectionStartElem());
                var $currentRow = getnode.getRowNode(selectDom.elems[0]);
                if (!$currentRow) {
                  return true;
                }
                var index2 = Number(getnode.getCurrentRowIndex($node2.elems[0], $currentRow));
                if (index2 !== 0) {
                  index2 = 0;
                }
                var htmlStr = getnode.getTableHtml($node2.elems[0]);
                var newdom = getnode.getTableHtml(operating_event_1["default"].setTheHeader(dom_core_1["default"](htmlStr), index2, "th").elems[0]);
                newdom = _isEmptyP($node2, newdom);
                editor2.selection.createRangeByElem($node2);
                editor2.selection.restoreSelection();
                editor2.cmd["do"]("insertHTML", newdom);
                return true;
              }
            }, {
              $elem: dom_core_1["default"]("<span>" + t("\u53D6\u6D88\u8868\u5934") + "</span>"),
              onClick: function onClick(editor2, $node2) {
                var selectDom = dom_core_1["default"](editor2.selection.getSelectionStartElem());
                var $currentRow = getnode.getRowNode(selectDom.elems[0]);
                if (!$currentRow) {
                  return true;
                }
                var index2 = Number(getnode.getCurrentRowIndex($node2.elems[0], $currentRow));
                if (index2 !== 0) {
                  index2 = 0;
                }
                var htmlStr = getnode.getTableHtml($node2.elems[0]);
                var newdom = getnode.getTableHtml(operating_event_1["default"].setTheHeader(dom_core_1["default"](htmlStr), index2, "td").elems[0]);
                newdom = _isEmptyP($node2, newdom);
                editor2.selection.createRangeByElem($node2);
                editor2.selection.restoreSelection();
                editor2.cmd["do"]("insertHTML", newdom);
                return true;
              }
            }];
            tooltip = new Tooltip_1["default"](editor, $node, conf);
            tooltip.create();
          }
          function hideTableTooltip() {
            if (tooltip) {
              tooltip.remove();
              tooltip = null;
            }
          }
          return {
            showTableTooltip,
            hideTableTooltip
          };
        }
        function isMoreRowAction(editor) {
          var $startElem = editor.selection.getSelectionStartElem();
          var $endElem = editor.selection.getSelectionEndElem();
          if (($startElem === null || $startElem === void 0 ? void 0 : $startElem.elems[0]) !== ($endElem === null || $endElem === void 0 ? void 0 : $endElem.elems[0])) {
            return true;
          } else {
            return false;
          }
        }
        function bindTooltipEvent(editor) {
          var _a = createShowHideFn(editor), showTableTooltip = _a.showTableTooltip, hideTableTooltip = _a.hideTableTooltip;
          editor.txt.eventHooks.tableClickEvents.push(showTableTooltip);
          editor.txt.eventHooks.clickEvents.push(hideTableTooltip);
          editor.txt.eventHooks.keyupEvents.push(hideTableTooltip);
          editor.txt.eventHooks.toolbarClickEvents.push(hideTableTooltip);
          editor.txt.eventHooks.menuClickEvents.push(hideTableTooltip);
          editor.txt.eventHooks.textScrollEvents.push(hideTableTooltip);
        }
        exports2["default"] = bindTooltipEvent;
        function _isEmptyP($node, newdom) {
          var nextNode = $node.elems[0].nextSibling;
          if (!nextNode || nextNode.innerHTML === "<br>") {
            newdom += "" + const_1.EMPTY_P;
          }
          return newdom;
        }
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _slice = _interopRequireDefault(__webpack_require__(45));
        var _splice = _interopRequireDefault(__webpack_require__(91));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _from = _interopRequireDefault(__webpack_require__(138));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        function ProcessingRow($node, _index) {
          var $dom = generateDomAction($node);
          var domArray = (0, _slice["default"])(Array.prototype).apply($dom.children);
          var childrenLength = domArray[0].children.length;
          var tr = document.createElement("tr");
          for (var i = 0; i < childrenLength; i++) {
            var td = document.createElement("td");
            tr.appendChild(td);
          }
          (0, _splice["default"])(domArray).call(domArray, _index + 1, 0, tr);
          removeAndInsertAction($dom, domArray);
          return dom_core_1["default"]($dom.parentNode);
        }
        function ProcessingCol($node, _index) {
          var $dom = generateDomAction($node);
          var domArray = (0, _slice["default"])(Array.prototype).apply($dom.children);
          var _loop_1 = function _loop_12(i2) {
            var _context;
            var cArray = [];
            (0, _forEach["default"])(_context = (0, _from["default"])(domArray[i2].children)).call(_context, function(item) {
              cArray.push(item);
            });
            while (domArray[i2].children.length !== 0) {
              domArray[i2].removeChild(domArray[i2].children[0]);
            }
            var td = dom_core_1["default"](cArray[0]).getNodeName() !== "TH" ? document.createElement("td") : document.createElement("th");
            (0, _splice["default"])(cArray).call(cArray, _index + 1, 0, td);
            for (var j = 0; j < cArray.length; j++) {
              domArray[i2].appendChild(cArray[j]);
            }
          };
          for (var i = 0; i < domArray.length; i++) {
            _loop_1(i);
          }
          removeAndInsertAction($dom, domArray);
          return dom_core_1["default"]($dom.parentNode);
        }
        function DeleteRow($node, _index) {
          var $dom = generateDomAction($node);
          var domArray = (0, _slice["default"])(Array.prototype).apply($dom.children);
          (0, _splice["default"])(domArray).call(domArray, _index, 1);
          removeAndInsertAction($dom, domArray);
          return dom_core_1["default"]($dom.parentNode);
        }
        function DeleteCol($node, _index) {
          var $dom = generateDomAction($node);
          var domArray = (0, _slice["default"])(Array.prototype).apply($dom.children);
          var _loop_2 = function _loop_22(i2) {
            var _context2;
            var cArray = [];
            (0, _forEach["default"])(_context2 = (0, _from["default"])(domArray[i2].children)).call(_context2, function(item) {
              cArray.push(item);
            });
            while (domArray[i2].children.length !== 0) {
              domArray[i2].removeChild(domArray[i2].children[0]);
            }
            (0, _splice["default"])(cArray).call(cArray, _index, 1);
            for (var j = 0; j < cArray.length; j++) {
              domArray[i2].appendChild(cArray[j]);
            }
          };
          for (var i = 0; i < domArray.length; i++) {
            _loop_2(i);
          }
          removeAndInsertAction($dom, domArray);
          return dom_core_1["default"]($dom.parentNode);
        }
        function setTheHeader($node, _index, type) {
          var $dom = generateDomAction($node);
          var domArray = (0, _slice["default"])(Array.prototype).apply($dom.children);
          var cols = domArray[_index].children;
          var tr = document.createElement("tr");
          var _loop_3 = function _loop_32(i2) {
            var _context3;
            var el = document.createElement(type);
            var col = cols[i2];
            (0, _forEach["default"])(_context3 = (0, _from["default"])(col.childNodes)).call(_context3, function(item) {
              el.appendChild(item);
            });
            tr.appendChild(el);
          };
          for (var i = 0; i < cols.length; i++) {
            _loop_3(i);
          }
          (0, _splice["default"])(domArray).call(domArray, _index, 1, tr);
          removeAndInsertAction($dom, domArray);
          return dom_core_1["default"]($dom.parentNode);
        }
        function removeAndInsertAction($dom, domArray) {
          while ($dom.children.length !== 0) {
            $dom.removeChild($dom.children[0]);
          }
          for (var i = 0; i < domArray.length; i++) {
            $dom.appendChild(domArray[i]);
          }
        }
        function generateDomAction($node) {
          var $dom = $node.elems[0].children[0];
          if ($dom.nodeName === "COLGROUP") {
            $dom = $node.elems[0].children[$node.elems[0].children.length - 1];
          }
          return $dom;
        }
        exports2["default"] = {
          ProcessingRow,
          ProcessingCol,
          DeleteRow,
          DeleteCol,
          setTheHeader
        };
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(396);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(50);
        __webpack_require__(397);
        var path = __webpack_require__(9);
        module2.exports = path.Array.from;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var from = __webpack_require__(398);
        var checkCorrectnessOfIteration = __webpack_require__(115);
        var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function(iterable) {
          Array.from(iterable);
        });
        $({ target: "Array", stat: true, forced: INCORRECT_ITERATION }, {
          from
        });
      },
      function(module2, exports2, __webpack_require__) {
        var bind = __webpack_require__(40);
        var toObject = __webpack_require__(31);
        var callWithSafeIterationClosing = __webpack_require__(114);
        var isArrayIteratorMethod = __webpack_require__(112);
        var toLength = __webpack_require__(35);
        var createProperty = __webpack_require__(69);
        var getIteratorMethod = __webpack_require__(113);
        module2.exports = function from(arrayLike) {
          var O = toObject(arrayLike);
          var C = typeof this == "function" ? this : Array;
          var argumentsLength = arguments.length;
          var mapfn = argumentsLength > 1 ? arguments[1] : void 0;
          var mapping = mapfn !== void 0;
          var iteratorMethod = getIteratorMethod(O);
          var index2 = 0;
          var length, result, step, iterator, next, value;
          if (mapping)
            mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : void 0, 2);
          if (iteratorMethod != void 0 && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
            iterator = iteratorMethod.call(O);
            next = iterator.next;
            result = new C();
            for (; !(step = next.call(iterator)).done; index2++) {
              value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index2], true) : step.value;
              createProperty(result, index2, value);
            }
          } else {
            length = toLength(O.length);
            result = new C(length);
            for (; length > index2; index2++) {
              value = mapping ? mapfn(O[index2], index2) : O[index2];
              createProperty(result, index2, value);
            }
          }
          result.length = index2;
          return result;
        };
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _from = _interopRequireDefault(__webpack_require__(138));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var getNode = function() {
          function getNode2(editor) {
            this.editor = editor;
          }
          getNode2.prototype.getRowNode = function($node) {
            var _a;
            var DOM = dom_core_1["default"]($node).elems[0];
            if (!DOM.parentNode) {
              return DOM;
            }
            DOM = (_a = dom_core_1["default"](DOM).parentUntil("TR", DOM)) === null || _a === void 0 ? void 0 : _a.elems[0];
            return DOM;
          };
          getNode2.prototype.getCurrentRowIndex = function($node, $dom) {
            var _context;
            var _index = 0;
            var $nodeChild = $node.children[0];
            if ($nodeChild.nodeName === "COLGROUP") {
              $nodeChild = $node.children[$node.children.length - 1];
            }
            (0, _forEach["default"])(_context = (0, _from["default"])($nodeChild.children)).call(_context, function(item, index2) {
              item === $dom ? _index = index2 : "";
            });
            return _index;
          };
          getNode2.prototype.getCurrentColIndex = function($node) {
            var _context2;
            var _a;
            var _index = 0;
            var rowDom = dom_core_1["default"]($node).getNodeName() === "TD" || dom_core_1["default"]($node).getNodeName() === "TH" ? $node : (_a = dom_core_1["default"]($node).parentUntil("TD", $node)) === null || _a === void 0 ? void 0 : _a.elems[0];
            var colDom = dom_core_1["default"](rowDom).parent();
            (0, _forEach["default"])(_context2 = (0, _from["default"])(colDom.elems[0].children)).call(_context2, function(item, index2) {
              item === rowDom ? _index = index2 : "";
            });
            return _index;
          };
          getNode2.prototype.getTableHtml = function($node) {
            var htmlStr = '<table border="0" width="100%" cellpadding="0" cellspacing="0">' + dom_core_1["default"]($node).html() + "</table>";
            return htmlStr;
          };
          return getNode2;
        }();
        exports2["default"] = getNode;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.bindEventKeyboardEvent = exports2.bindClickEvent = void 0;
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        function isEmptyLine(topElem) {
          if (!topElem.length) {
            return false;
          }
          var dom = topElem.elems[0];
          return dom.nodeName === "P" && dom.innerHTML === "<br>";
        }
        function bindClickEvent(editor) {
          function handleTripleClick($dom, e) {
            if (e.detail >= 3) {
              var selection = window.getSelection();
              if (selection) {
                var focusNode = selection.focusNode, anchorNode = selection.anchorNode;
                var $anchorNode = dom_core_1["default"](anchorNode === null || anchorNode === void 0 ? void 0 : anchorNode.parentElement);
                if (!$dom.isContain(dom_core_1["default"](focusNode))) {
                  var $td = $anchorNode.elems[0].tagName === "TD" ? $anchorNode : $anchorNode.parentUntilEditor("td", editor);
                  if ($td) {
                    var range = editor.selection.getRange();
                    range === null || range === void 0 ? void 0 : range.setEnd($td.elems[0], $td.elems[0].childNodes.length);
                    editor.selection.restoreSelection();
                  }
                }
              }
            }
          }
          editor.txt.eventHooks.tableClickEvents.push(handleTripleClick);
        }
        exports2.bindClickEvent = bindClickEvent;
        function bindEventKeyboardEvent(editor) {
          var txt = editor.txt, selection = editor.selection;
          var keydownEvents = txt.eventHooks.keydownEvents;
          keydownEvents.push(function(e) {
            editor.selection.saveRange();
            var $selectionContainerElem = selection.getSelectionContainerElem();
            if ($selectionContainerElem) {
              var $topElem = $selectionContainerElem.getNodeTop(editor);
              var $preElem = $topElem.length ? $topElem.prev().length ? $topElem.prev() : null : null;
              if ($preElem && $preElem.getNodeName() === "TABLE" && selection.isSelectionEmpty() && selection.getCursorPos() === 0 && e.keyCode === 8) {
                var $nextElem = $topElem.next();
                var hasNext = !!$nextElem.length;
                if (hasNext && isEmptyLine($topElem)) {
                  $topElem.remove();
                  editor.selection.setRangeToElem($nextElem.elems[0]);
                }
                e.preventDefault();
              }
            }
          });
        }
        exports2.bindEventKeyboardEvent = bindEventKeyboardEvent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _map = _interopRequireDefault(__webpack_require__(26));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.formatCodeHtml = void 0;
        var tslib_1 = __webpack_require__(2);
        var PanelMenu_1 = tslib_1.__importDefault(__webpack_require__(38));
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var util_1 = __webpack_require__(6);
        var create_panel_conf_1 = tslib_1.__importDefault(__webpack_require__(402));
        var is_active_1 = tslib_1.__importDefault(__webpack_require__(139));
        var Panel_1 = tslib_1.__importDefault(__webpack_require__(33));
        var index_1 = tslib_1.__importDefault(__webpack_require__(403));
        function formatCodeHtml(editor, html) {
          if (!html)
            return html;
          html = deleteHighlightCode(html);
          html = formatEnterCode(html);
          html = util_1.replaceSpecialSymbol(html);
          return html;
          function formatEnterCode(html2) {
            var preArr = html2.match(/<pre[\s|\S]+?\/pre>/g);
            if (preArr === null)
              return html2;
            (0, _map["default"])(preArr).call(preArr, function(item) {
              html2 = html2.replace(item, item.replace(/<\/code><code>/g, "\n").replace(/<br>/g, ""));
            });
            return html2;
          }
          function deleteHighlightCode(html2) {
            var _context;
            var m = html2.match(/<span\sclass="hljs[\s|\S]+?\/span>/gm);
            if (!m || !m.length)
              return html2;
            var r = (0, _map["default"])(_context = util_1.deepClone(m)).call(_context, function(i2) {
              i2 = i2.replace(/<span\sclass="hljs[^>]+>/, "");
              return i2.replace(/<\/span>/, "");
            });
            for (var i = 0; i < m.length; i++) {
              html2 = html2.replace(m[i], r[i]);
            }
            return deleteHighlightCode(html2);
          }
        }
        exports2.formatCodeHtml = formatCodeHtml;
        var Code = function(_super) {
          tslib_1.__extends(Code2, _super);
          function Code2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u4EE3\u7801"><i class="w-e-icon-terminal"></i></div>');
            _this = _super.call(this, $elem, editor) || this;
            index_1["default"](editor);
            return _this;
          }
          Code2.prototype.insertLineCode = function(text) {
            var editor = this.editor;
            var $code = dom_core_1["default"]("<code>" + text + "</code>");
            editor.cmd["do"]("insertElem", $code);
            editor.selection.createRangeByElem($code, false);
            editor.selection.restoreSelection();
          };
          Code2.prototype.clickHandler = function() {
            var editor = this.editor;
            var selectionText = editor.selection.getSelectionText();
            if (this.isActive) {
              return;
            } else {
              if (editor.selection.isSelectionEmpty()) {
                this.createPanel("", "");
              } else {
                this.insertLineCode(selectionText);
              }
            }
          };
          Code2.prototype.createPanel = function(text, languageType) {
            var conf = create_panel_conf_1["default"](this.editor, text, languageType);
            var panel = new Panel_1["default"](this, conf);
            panel.create();
          };
          Code2.prototype.tryChangeActive = function() {
            var editor = this.editor;
            if (is_active_1["default"](editor)) {
              this.active();
            } else {
              this.unActive();
            }
          };
          return Code2;
        }(PanelMenu_1["default"]);
        exports2["default"] = Code;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _map = _interopRequireDefault(__webpack_require__(26));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var util_1 = __webpack_require__(6);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var is_active_1 = tslib_1.__importDefault(__webpack_require__(139));
        var const_1 = __webpack_require__(7);
        function default_1(editor, text, languageType) {
          var _context;
          var inputIFrameId = util_1.getRandom("input-iframe");
          var languageId = util_1.getRandom("select");
          var btnOkId = util_1.getRandom("btn-ok");
          function insertCode(languateType, code) {
            var _a;
            var active = is_active_1["default"](editor);
            if (active) {
              selectCodeElem();
            }
            var content = (_a = editor.selection.getSelectionStartElem()) === null || _a === void 0 ? void 0 : _a.elems[0].innerHTML;
            if (content) {
              editor.cmd["do"]("insertHTML", const_1.EMPTY_P);
            }
            var formatCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            if (editor.highlight) {
              formatCode = editor.highlight.highlightAuto(formatCode).value;
            }
            editor.cmd["do"]("insertHTML", '<pre><code class="' + languateType + '">' + formatCode + "</code></pre>");
            var $code = editor.selection.getSelectionStartElem();
            var $codeElem = $code === null || $code === void 0 ? void 0 : $code.getNodeTop(editor);
            if (($codeElem === null || $codeElem === void 0 ? void 0 : $codeElem.getNextSibling().elems.length) === 0) {
              dom_core_1["default"](const_1.EMPTY_P).insertAfter($codeElem);
            }
          }
          function selectCodeElem() {
            if (!is_active_1["default"](editor))
              return;
            var $code = editor.selection.getSelectionStartElem();
            var $codeElem = $code === null || $code === void 0 ? void 0 : $code.getNodeTop(editor);
            if (!$codeElem)
              return;
            editor.selection.createRangeByElem($codeElem);
            editor.selection.restoreSelection();
          }
          var t = function t2(text2) {
            return editor.i18next.t(text2);
          };
          var conf = {
            width: 500,
            height: 0,
            tabs: [{
              title: t("menus.panelMenus.code.\u63D2\u5165\u4EE3\u7801"),
              tpl: '<div>\n                        <select name="" id="' + languageId + '">\n                            ' + (0, _map["default"])(_context = editor.config.languageType).call(_context, function(language) {
                return "<option " + (languageType == language ? "selected" : "") + ' value ="' + language + '">' + language + "</option>";
              }) + '\n                        </select>\n                        <textarea id="' + inputIFrameId + '" type="text" class="wang-code-textarea" placeholder="" style="height: 160px">' + text.replace(/&quot;/g, '"') + '</textarea>\n                        <div class="w-e-button-container">\n                            <button type="button" id="' + btnOkId + '" class="right">' + (is_active_1["default"](editor) ? t("\u4FEE\u6539") : t("\u63D2\u5165")) + "</button>\n                        </div>\n                    </div>",
              events: [
                {
                  selector: "#" + btnOkId,
                  type: "click",
                  fn: function fn() {
                    var $code = document.getElementById(inputIFrameId);
                    var $select = dom_core_1["default"]("#" + languageId);
                    var languageType2 = $select.val();
                    var code = $code.value;
                    if (!code)
                      return;
                    if (is_active_1["default"](editor)) {
                      return false;
                    } else {
                      insertCode(languageType2, code);
                    }
                    return true;
                  }
                }
              ]
            }]
          };
          return conf;
        }
        exports2["default"] = default_1;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var tooltip_event_1 = tslib_1.__importDefault(__webpack_require__(404));
        var jump_code_block_down_1 = tslib_1.__importDefault(__webpack_require__(405));
        function bindEvent(editor) {
          tooltip_event_1["default"](editor);
          jump_code_block_down_1["default"](editor);
        }
        exports2["default"] = bindEvent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.createShowHideFn = void 0;
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var Tooltip_1 = tslib_1.__importDefault(__webpack_require__(39));
        function createShowHideFn(editor) {
          var tooltip;
          function showCodeTooltip($code) {
            var i18nPrefix = "menus.panelMenus.code.";
            var t = function t2(text, prefix) {
              if (prefix === void 0) {
                prefix = i18nPrefix;
              }
              return editor.i18next.t(prefix + text);
            };
            var conf = [{
              $elem: dom_core_1["default"]("<span>" + t("\u5220\u9664\u4EE3\u7801") + "</span>"),
              onClick: function onClick(editor2, $code2) {
                $code2.remove();
                return true;
              }
            }];
            tooltip = new Tooltip_1["default"](editor, $code, conf);
            tooltip.create();
          }
          function hideCodeTooltip() {
            if (tooltip) {
              tooltip.remove();
              tooltip = null;
            }
          }
          return {
            showCodeTooltip,
            hideCodeTooltip
          };
        }
        exports2.createShowHideFn = createShowHideFn;
        function bindTooltipEvent(editor) {
          var _a = createShowHideFn(editor), showCodeTooltip = _a.showCodeTooltip, hideCodeTooltip = _a.hideCodeTooltip;
          editor.txt.eventHooks.codeClickEvents.push(showCodeTooltip);
          editor.txt.eventHooks.clickEvents.push(hideCodeTooltip);
          editor.txt.eventHooks.toolbarClickEvents.push(hideCodeTooltip);
          editor.txt.eventHooks.menuClickEvents.push(hideCodeTooltip);
          editor.txt.eventHooks.textScrollEvents.push(hideCodeTooltip);
        }
        exports2["default"] = bindTooltipEvent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var const_1 = __webpack_require__(7);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        function bindEventJumpCodeBlock(editor) {
          var $textElem = editor.$textElem, selection = editor.selection, txt = editor.txt;
          var keydownEvents = txt.eventHooks.keydownEvents;
          keydownEvents.push(function(e) {
            var _a;
            if (e.keyCode !== 40)
              return;
            var node = selection.getSelectionContainerElem();
            var $lastNode = (_a = $textElem.children()) === null || _a === void 0 ? void 0 : _a.last();
            if ((node === null || node === void 0 ? void 0 : node.elems[0].tagName) === "XMP" && ($lastNode === null || $lastNode === void 0 ? void 0 : $lastNode.elems[0].tagName) === "PRE") {
              var $emptyP = dom_core_1["default"](const_1.EMPTY_P);
              $textElem.append($emptyP);
            }
          });
          keydownEvents.push(function(e) {
            editor.selection.saveRange();
            var $selectionContainerElem = selection.getSelectionContainerElem();
            if ($selectionContainerElem) {
              var $topElem = $selectionContainerElem.getNodeTop(editor);
              var $preElem = $topElem === null || $topElem === void 0 ? void 0 : $topElem.prev();
              var $nextElem = $topElem === null || $topElem === void 0 ? void 0 : $topElem.getNextSibling();
              if ($preElem.length && ($preElem === null || $preElem === void 0 ? void 0 : $preElem.getNodeName()) === "PRE" && $nextElem.length === 0) {
                if (selection.getCursorPos() === 0) {
                  if (e.keyCode === 8) {
                    var $emptyP = dom_core_1["default"](const_1.EMPTY_P);
                    $textElem.append($emptyP);
                  }
                }
              }
            }
          });
        }
        exports2["default"] = bindEventJumpCodeBlock;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var BtnMenu_1 = tslib_1.__importDefault(__webpack_require__(23));
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var index_1 = tslib_1.__importDefault(__webpack_require__(407));
        var util_1 = __webpack_require__(6);
        var const_1 = __webpack_require__(7);
        var splitLine = function(_super) {
          tslib_1.__extends(splitLine2, _super);
          function splitLine2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u5206\u5272\u7EBF"><i class="w-e-icon-split-line"></i></div>');
            _this = _super.call(this, $elem, editor) || this;
            index_1["default"](editor);
            return _this;
          }
          splitLine2.prototype.clickHandler = function() {
            var editor = this.editor;
            var range = editor.selection.getRange();
            var $selectionElem = editor.selection.getSelectionContainerElem();
            if (!($selectionElem === null || $selectionElem === void 0 ? void 0 : $selectionElem.length))
              return;
            var $DomElement = dom_core_1["default"]($selectionElem.elems[0]);
            var $tableDOM = $DomElement.parentUntil("TABLE", $selectionElem.elems[0]);
            var $imgDOM = $DomElement.children();
            if ($DomElement.getNodeName() === "CODE")
              return;
            if ($tableDOM && dom_core_1["default"]($tableDOM.elems[0]).getNodeName() === "TABLE")
              return;
            if ($imgDOM && $imgDOM.length !== 0 && dom_core_1["default"]($imgDOM.elems[0]).getNodeName() === "IMG" && !(range === null || range === void 0 ? void 0 : range.collapsed)) {
              return;
            }
            this.createSplitLine();
          };
          splitLine2.prototype.createSplitLine = function() {
            var splitLineDOM = "<hr/>" + const_1.EMPTY_P;
            if (util_1.UA.isFirefox) {
              splitLineDOM = "<hr/><p></p>";
            }
            this.editor.cmd["do"]("insertHTML", splitLineDOM);
          };
          splitLine2.prototype.tryChangeActive = function() {
          };
          return splitLine2;
        }(BtnMenu_1["default"]);
        exports2["default"] = splitLine;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var tooltip_event_1 = tslib_1.__importDefault(__webpack_require__(408));
        function bindEvent(editor) {
          tooltip_event_1["default"](editor);
        }
        exports2["default"] = bindEvent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var Tooltip_1 = tslib_1.__importDefault(__webpack_require__(39));
        function createShowHideFn(editor) {
          var tooltip;
          function showSplitLineTooltip($splitLine) {
            var conf = [{
              $elem: dom_core_1["default"]("<span>" + editor.i18next.t("menus.panelMenus.\u5220\u9664") + "</span>"),
              onClick: function onClick(editor2, $splitLine2) {
                editor2.selection.createRangeByElem($splitLine2);
                editor2.selection.restoreSelection();
                editor2.cmd["do"]("delete");
                return true;
              }
            }];
            tooltip = new Tooltip_1["default"](editor, $splitLine, conf);
            tooltip.create();
          }
          function hideSplitLineTooltip() {
            if (tooltip) {
              tooltip.remove();
              tooltip = null;
            }
          }
          return {
            showSplitLineTooltip,
            hideSplitLineTooltip
          };
        }
        function bindTooltipEvent(editor) {
          var _a = createShowHideFn(editor), showSplitLineTooltip = _a.showSplitLineTooltip, hideSplitLineTooltip = _a.hideSplitLineTooltip;
          editor.txt.eventHooks.splitLineEvents.push(showSplitLineTooltip);
          editor.txt.eventHooks.clickEvents.push(hideSplitLineTooltip);
          editor.txt.eventHooks.keyupEvents.push(hideSplitLineTooltip);
          editor.txt.eventHooks.toolbarClickEvents.push(hideSplitLineTooltip);
          editor.txt.eventHooks.menuClickEvents.push(hideSplitLineTooltip);
          editor.txt.eventHooks.textScrollEvents.push(hideSplitLineTooltip);
        }
        exports2["default"] = bindTooltipEvent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var BtnMenu_1 = tslib_1.__importDefault(__webpack_require__(23));
        var util_1 = __webpack_require__(98);
        var bind_event_1 = tslib_1.__importDefault(__webpack_require__(415));
        var todo_1 = tslib_1.__importDefault(__webpack_require__(140));
        var Todo = function(_super) {
          tslib_1.__extends(Todo2, _super);
          function Todo2(editor) {
            var _this = this;
            var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u5F85\u529E\u4E8B\u9879">\n                    <i class="w-e-icon-checkbox-checked"></i>\n                </div>');
            _this = _super.call(this, $elem, editor) || this;
            bind_event_1["default"](editor);
            return _this;
          }
          Todo2.prototype.clickHandler = function() {
            var editor = this.editor;
            if (!util_1.isAllTodo(editor)) {
              this.setTodo();
            } else {
              this.cancelTodo();
              this.tryChangeActive();
            }
          };
          Todo2.prototype.tryChangeActive = function() {
            if (util_1.isAllTodo(this.editor)) {
              this.active();
            } else {
              this.unActive();
            }
          };
          Todo2.prototype.setTodo = function() {
            var editor = this.editor;
            var topNodeElem = editor.selection.getSelectionRangeTopNodes();
            (0, _forEach["default"])(topNodeElem).call(topNodeElem, function($node) {
              var _a;
              var nodeName = $node === null || $node === void 0 ? void 0 : $node.getNodeName();
              if (nodeName === "P") {
                var todo = todo_1["default"]($node);
                var todoNode = todo.getTodo();
                var child = (_a = todoNode.children()) === null || _a === void 0 ? void 0 : _a.getNode();
                todoNode.insertAfter($node);
                editor.selection.moveCursor(child);
                $node.remove();
              }
            });
            this.tryChangeActive();
          };
          Todo2.prototype.cancelTodo = function() {
            var editor = this.editor;
            var $topNodeElems = editor.selection.getSelectionRangeTopNodes();
            (0, _forEach["default"])($topNodeElems).call($topNodeElems, function($topNodeElem) {
              var _a, _b, _c;
              var content = (_b = (_a = $topNodeElem.childNodes()) === null || _a === void 0 ? void 0 : _a.childNodes()) === null || _b === void 0 ? void 0 : _b.clone(true);
              var $p = dom_core_1["default"]("<p></p>");
              $p.append(content);
              $p.insertAfter($topNodeElem);
              (_c = $p.childNodes()) === null || _c === void 0 ? void 0 : _c.get(0).remove();
              editor.selection.moveCursor($p.getNode());
              $topNodeElem.remove();
            });
          };
          return Todo2;
        }(BtnMenu_1["default"]);
        exports2["default"] = Todo;
      },
      function(module2, exports2, __webpack_require__) {
        module2.exports = __webpack_require__(411);
      },
      function(module2, exports2, __webpack_require__) {
        var parent = __webpack_require__(412);
        module2.exports = parent;
      },
      function(module2, exports2, __webpack_require__) {
        var every = __webpack_require__(413);
        var ArrayPrototype = Array.prototype;
        module2.exports = function(it) {
          var own = it.every;
          return it === ArrayPrototype || it instanceof Array && own === ArrayPrototype.every ? every : own;
        };
      },
      function(module2, exports2, __webpack_require__) {
        __webpack_require__(414);
        var entryVirtual = __webpack_require__(15);
        module2.exports = entryVirtual("Array").every;
      },
      function(module2, exports2, __webpack_require__) {
        var $ = __webpack_require__(5);
        var $every = __webpack_require__(32).every;
        var arrayMethodIsStrict = __webpack_require__(67);
        var arrayMethodUsesToLength = __webpack_require__(22);
        var STRICT_METHOD = arrayMethodIsStrict("every");
        var USES_TO_LENGTH = arrayMethodUsesToLength("every");
        $({ target: "Array", proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
          every: function every(callbackfn) {
            return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          }
        });
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var util_1 = __webpack_require__(98);
        var todo_1 = tslib_1.__importDefault(__webpack_require__(140));
        var util_2 = __webpack_require__(98);
        var const_1 = __webpack_require__(7);
        function bindEvent(editor) {
          function todoEnter(e) {
            var _a, _b;
            if (util_1.isAllTodo(editor)) {
              e.preventDefault();
              var selection = editor.selection;
              var $topSelectElem = selection.getSelectionRangeTopNodes()[0];
              var $li = (_a = $topSelectElem.childNodes()) === null || _a === void 0 ? void 0 : _a.get(0);
              var selectionNode = (_b = window.getSelection()) === null || _b === void 0 ? void 0 : _b.anchorNode;
              var range = selection.getRange();
              if (!(range === null || range === void 0 ? void 0 : range.collapsed)) {
                var rangeChildNodes = range === null || range === void 0 ? void 0 : range.commonAncestorContainer.childNodes;
                var startContainer_1 = range === null || range === void 0 ? void 0 : range.startContainer;
                var endContainer_1 = range === null || range === void 0 ? void 0 : range.endContainer;
                var startPos = range === null || range === void 0 ? void 0 : range.startOffset;
                var endPos = range === null || range === void 0 ? void 0 : range.endOffset;
                var startElemIndex_1 = 0;
                var endElemIndex_1 = 0;
                var delList_1 = [];
                rangeChildNodes === null || rangeChildNodes === void 0 ? void 0 : (0, _forEach["default"])(rangeChildNodes).call(rangeChildNodes, function(v, i) {
                  if (v.contains(startContainer_1))
                    startElemIndex_1 = i;
                  if (v.contains(endContainer_1))
                    endElemIndex_1 = i;
                });
                if (endElemIndex_1 - startElemIndex_1 > 1) {
                  rangeChildNodes === null || rangeChildNodes === void 0 ? void 0 : (0, _forEach["default"])(rangeChildNodes).call(rangeChildNodes, function(v, i) {
                    if (i <= startElemIndex_1)
                      return;
                    if (i >= endElemIndex_1)
                      return;
                    delList_1.push(v);
                  });
                  (0, _forEach["default"])(delList_1).call(delList_1, function(v) {
                    v.remove();
                  });
                }
                util_2.dealTextNode(startContainer_1, startPos);
                util_2.dealTextNode(endContainer_1, endPos, false);
                editor.selection.moveCursor(endContainer_1, 0);
              }
              if ($topSelectElem.text() === "") {
                var $p = dom_core_1["default"](const_1.EMPTY_P);
                $p.insertAfter($topSelectElem);
                selection.moveCursor($p.getNode());
                $topSelectElem.remove();
                return;
              }
              var pos = selection.getCursorPos();
              var CursorNextNode = util_1.getCursorNextNode($li === null || $li === void 0 ? void 0 : $li.getNode(), selectionNode, pos);
              var todo = todo_1["default"](dom_core_1["default"](CursorNextNode));
              var $inputcontainer = todo.getInputContainer();
              var todoLiElem = $inputcontainer.parent().getNode();
              var $newTodo = todo.getTodo();
              var contentSection = $inputcontainer.getNode().nextSibling;
              if (($li === null || $li === void 0 ? void 0 : $li.text()) === "") {
                $li === null || $li === void 0 ? void 0 : $li.append(dom_core_1["default"]("<br>"));
              }
              $newTodo.insertAfter($topSelectElem);
              if (!contentSection || (contentSection === null || contentSection === void 0 ? void 0 : contentSection.textContent) === "") {
                if ((contentSection === null || contentSection === void 0 ? void 0 : contentSection.nodeName) !== "BR") {
                  var $br = dom_core_1["default"]("<br>");
                  $br.insertAfter($inputcontainer);
                }
                selection.moveCursor(todoLiElem, 1);
              } else {
                selection.moveCursor(todoLiElem);
              }
            }
          }
          function delDown(e) {
            var _a, _b;
            if (util_1.isAllTodo(editor)) {
              var selection = editor.selection;
              var $topSelectElem = selection.getSelectionRangeTopNodes()[0];
              var $li = (_a = $topSelectElem.childNodes()) === null || _a === void 0 ? void 0 : _a.getNode();
              var $p = dom_core_1["default"]("<p></p>");
              var p_1 = $p.getNode();
              var selectionNode = (_b = window.getSelection()) === null || _b === void 0 ? void 0 : _b.anchorNode;
              var pos = selection.getCursorPos();
              var prevNode = selectionNode.previousSibling;
              if ($topSelectElem.text() === "") {
                e.preventDefault();
                var $newP = dom_core_1["default"](const_1.EMPTY_P);
                $newP.insertAfter($topSelectElem);
                $topSelectElem.remove();
                selection.moveCursor($newP.getNode(), 0);
                return;
              }
              if ((prevNode === null || prevNode === void 0 ? void 0 : prevNode.nodeName) === "SPAN" && prevNode.childNodes[0].nodeName === "INPUT" && pos === 0) {
                var _context;
                e.preventDefault();
                $li === null || $li === void 0 ? void 0 : (0, _forEach["default"])(_context = $li.childNodes).call(_context, function(v, index2) {
                  if (index2 === 0)
                    return;
                  p_1.appendChild(v.cloneNode(true));
                });
                $p.insertAfter($topSelectElem);
                $topSelectElem.remove();
              }
            }
          }
          function deleteUp() {
            var selection = editor.selection;
            var $topSelectElem = selection.getSelectionRangeTopNodes()[0];
            if ($topSelectElem && util_2.isTodo($topSelectElem)) {
              if ($topSelectElem.text() === "") {
                dom_core_1["default"](const_1.EMPTY_P).insertAfter($topSelectElem);
                $topSelectElem.remove();
              }
            }
          }
          function inputClick(e) {
            if (e && e.target instanceof HTMLInputElement) {
              if (e.target.type === "checkbox") {
                if (e.target.checked) {
                  e.target.setAttribute("checked", "true");
                } else {
                  e.target.removeAttribute("checked");
                }
              }
            }
          }
          editor.txt.eventHooks.enterDownEvents.push(todoEnter);
          editor.txt.eventHooks.deleteUpEvents.push(deleteUp);
          editor.txt.eventHooks.deleteDownEvents.push(delDown);
          editor.txt.eventHooks.clickEvents.push(inputClick);
        }
        exports2["default"] = bindEvent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.selectorValidator = void 0;
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var util_1 = __webpack_require__(6);
        var const_1 = __webpack_require__(7);
        var text_1 = tslib_1.__importDefault(__webpack_require__(130));
        var styleSettings = {
          border: "1px solid #c9d8db",
          toolbarBgColor: "#FFF",
          toolbarBottomBorder: "1px solid #EEE"
        };
        function default_1(editor) {
          var toolbarSelector = editor.toolbarSelector;
          var $toolbarSelector = dom_core_1["default"](toolbarSelector);
          var textSelector = editor.textSelector;
          var config = editor.config;
          var height = config.height;
          var i18next = editor.i18next;
          var $toolbarElem = dom_core_1["default"]("<div></div>");
          var $textContainerElem = dom_core_1["default"]("<div></div>");
          var $textElem;
          var $children;
          var $subChildren = null;
          if (textSelector == null) {
            $children = $toolbarSelector.children();
            $toolbarSelector.append($toolbarElem).append($textContainerElem);
            $toolbarElem.css("background-color", styleSettings.toolbarBgColor).css("border", styleSettings.border).css("border-bottom", styleSettings.toolbarBottomBorder);
            $textContainerElem.css("border", styleSettings.border).css("border-top", "none").css("height", height + "px");
          } else {
            $toolbarSelector.append($toolbarElem);
            $subChildren = dom_core_1["default"](textSelector).children();
            dom_core_1["default"](textSelector).append($textContainerElem);
            $children = $textContainerElem.children();
          }
          $textElem = dom_core_1["default"]("<div></div>");
          $textElem.attr("contenteditable", "true").css("width", "100%").css("height", "100%");
          var $placeholder;
          var placeholder = editor.config.placeholder;
          if (placeholder !== text_1["default"].placeholder) {
            $placeholder = dom_core_1["default"]("<div>" + placeholder + "</div>");
          } else {
            $placeholder = dom_core_1["default"]("<div>" + i18next.t(placeholder) + "</div>");
          }
          $placeholder.addClass("placeholder");
          if ($children && $children.length) {
            $textElem.append($children);
            $placeholder.hide();
          } else {
            $textElem.append(dom_core_1["default"](const_1.EMPTY_P));
          }
          if ($subChildren && $subChildren.length) {
            $textElem.append($subChildren);
            $placeholder.hide();
          }
          $textContainerElem.append($textElem);
          $textContainerElem.append($placeholder);
          $toolbarElem.addClass("w-e-toolbar").css("z-index", editor.zIndex.get("toolbar"));
          $textContainerElem.addClass("w-e-text-container");
          $textContainerElem.css("z-index", editor.zIndex.get());
          $textElem.addClass("w-e-text");
          var toolbarElemId = util_1.getRandom("toolbar-elem");
          $toolbarElem.attr("id", toolbarElemId);
          var textElemId = util_1.getRandom("text-elem");
          $textElem.attr("id", textElemId);
          var textContainerCliheight = $textContainerElem.getBoundingClientRect().height;
          var textElemClientHeight = $textElem.getBoundingClientRect().height;
          if (textContainerCliheight !== textElemClientHeight) {
            $textElem.css("min-height", textContainerCliheight + "px");
          }
          editor.$toolbarElem = $toolbarElem;
          editor.$textContainerElem = $textContainerElem;
          editor.$textElem = $textElem;
          editor.toolbarElemId = toolbarElemId;
          editor.textElemId = textElemId;
        }
        exports2["default"] = default_1;
        function selectorValidator(editor) {
          var name = "data-we-id";
          var regexp = /^wangEditor-\d+$/;
          var textSelector = editor.textSelector, toolbarSelector = editor.toolbarSelector;
          var $el = {
            bar: dom_core_1["default"]("<div></div>"),
            text: dom_core_1["default"]("<div></div>")
          };
          if (toolbarSelector == null) {
            throw new Error("\u9519\u8BEF\uFF1A\u521D\u59CB\u5316\u7F16\u8F91\u5668\u65F6\u5019\u672A\u4F20\u5165\u4EFB\u4F55\u53C2\u6570\uFF0C\u8BF7\u67E5\u9605\u6587\u6863");
          } else {
            $el.bar = dom_core_1["default"](toolbarSelector);
            if (!$el.bar.elems.length) {
              throw new Error("\u65E0\u6548\u7684\u8282\u70B9\u9009\u62E9\u5668\uFF1A" + toolbarSelector);
            }
            if (regexp.test($el.bar.attr(name))) {
              throw new Error("\u521D\u59CB\u5316\u8282\u70B9\u5DF2\u5B58\u5728\u7F16\u8F91\u5668\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u91CD\u590D\u521B\u5EFA\u7F16\u8F91\u5668");
            }
          }
          if (textSelector) {
            $el.text = dom_core_1["default"](textSelector);
            if (!$el.text.elems.length) {
              throw new Error("\u65E0\u6548\u7684\u8282\u70B9\u9009\u62E9\u5668\uFF1A" + textSelector);
            }
            if (regexp.test($el.text.attr(name))) {
              throw new Error("\u521D\u59CB\u5316\u8282\u70B9\u5DF2\u5B58\u5728\u7F16\u8F91\u5668\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u91CD\u590D\u521B\u5EFA\u7F16\u8F91\u5668");
            }
          }
          $el.bar.attr(name, editor.id);
          $el.text.attr(name, editor.id);
          editor.beforeDestroy(function() {
            $el.bar.removeAttr(name);
            $el.text.removeAttr(name);
          });
        }
        exports2.selectorValidator = selectorValidator;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var const_1 = __webpack_require__(7);
        function initSelection(editor, newLine) {
          var $textElem = editor.$textElem;
          var $children = $textElem.children();
          if (!$children || !$children.length) {
            $textElem.append(dom_core_1["default"](const_1.EMPTY_P));
            initSelection(editor);
            return;
          }
          var $last = $children.last();
          if (newLine) {
            var html = $last.html().toLowerCase();
            var nodeName = $last.getNodeName();
            if (html !== "<br>" && html !== "<br/>" || nodeName !== "P") {
              $textElem.append(dom_core_1["default"](const_1.EMPTY_P));
              initSelection(editor);
              return;
            }
          }
          editor.selection.createRangeByElem($last, false, true);
          if (editor.config.focus) {
            editor.selection.restoreSelection();
          } else {
            editor.selection.clearWindowSelectionRange();
          }
        }
        exports2["default"] = initSelection;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        function bindEvent(editor) {
          _bindChange(editor);
          _bindFocusAndBlur(editor);
          _bindInput(editor);
        }
        function _bindChange(editor) {
          editor.txt.eventHooks.changeEvents.push(function() {
            var onchange = editor.config.onchange;
            if (onchange) {
              var html = editor.txt.html() || "";
              editor.isFocus = true;
              onchange(html);
            }
            editor.txt.togglePlaceholder();
          });
        }
        function _bindFocusAndBlur(editor) {
          editor.isFocus = false;
          function listener(e) {
            var target = e.target;
            var $target = dom_core_1["default"](target);
            var $textElem = editor.$textElem;
            var $toolbarElem = editor.$toolbarElem;
            var isChild = $textElem.isContain($target);
            var isToolbar = $toolbarElem.isContain($target);
            var isMenu = $toolbarElem.elems[0] == e.target ? true : false;
            if (!isChild) {
              if (isToolbar && !isMenu || !editor.isFocus) {
                return;
              }
              _blurHandler(editor);
              editor.isFocus = false;
            } else {
              if (!editor.isFocus) {
                _focusHandler(editor);
              }
              editor.isFocus = true;
            }
          }
          if (document.activeElement === editor.$textElem.elems[0] && editor.config.focus) {
            _focusHandler(editor);
            editor.isFocus = true;
          }
          dom_core_1["default"](document).on("click", listener);
          editor.beforeDestroy(function() {
            dom_core_1["default"](document).off("click", listener);
          });
        }
        function _bindInput(editor) {
          editor.$textElem.on("compositionstart", function() {
            editor.isComposing = true;
            editor.txt.togglePlaceholder();
          }).on("compositionend", function() {
            editor.isComposing = false;
            editor.txt.togglePlaceholder();
          });
        }
        function _blurHandler(editor) {
          var _context;
          var config = editor.config;
          var onblur = config.onblur;
          var currentHtml = editor.txt.html() || "";
          (0, _forEach["default"])(_context = editor.txt.eventHooks.onBlurEvents).call(_context, function(fn) {
            return fn();
          });
          onblur(currentHtml);
        }
        function _focusHandler(editor) {
          var config = editor.config;
          var onfocus = config.onfocus;
          var currentHtml = editor.txt.html() || "";
          onfocus(currentHtml);
        }
        exports2["default"] = bindEvent;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        function i18nextInit(editor) {
          var _a = editor.config, lang = _a.lang, languages = _a.languages;
          if (editor.i18next != null) {
            try {
              editor.i18next.init({
                ns: "wangEditor",
                lng: lang,
                defaultNS: "wangEditor",
                resources: languages
              });
            } catch (error) {
              throw new Error("i18next:" + error);
            }
            return;
          }
          editor.i18next = {
            t: function t(str) {
              var strArr = str.split(".");
              return strArr[strArr.length - 1];
            }
          };
        }
        exports2["default"] = i18nextInit;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _find = _interopRequireDefault(__webpack_require__(29));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.setUnFullScreen = exports2.setFullScreen = void 0;
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        __webpack_require__(421);
        var iconFullScreenText = "w-e-icon-fullscreen";
        var iconExitFullScreenText = "w-e-icon-fullscreen_exit";
        var classfullScreenEditor = "w-e-full-screen-editor";
        exports2.setFullScreen = function(editor) {
          var $editorParent = dom_core_1["default"](editor.toolbarSelector);
          var $textContainerElem = editor.$textContainerElem;
          var $toolbarElem = editor.$toolbarElem;
          var $iconElem = (0, _find["default"])($toolbarElem).call($toolbarElem, "i." + iconFullScreenText);
          var config = editor.config;
          $iconElem.removeClass(iconFullScreenText);
          $iconElem.addClass(iconExitFullScreenText);
          $editorParent.addClass(classfullScreenEditor);
          $editorParent.css("z-index", config.zIndexFullScreen);
          var bar = $toolbarElem.getBoundingClientRect();
          $textContainerElem.css("height", "calc(100% - " + bar.height + "px)");
        };
        exports2.setUnFullScreen = function(editor) {
          var $editorParent = dom_core_1["default"](editor.toolbarSelector);
          var $textContainerElem = editor.$textContainerElem;
          var $toolbarElem = editor.$toolbarElem;
          var $iconElem = (0, _find["default"])($toolbarElem).call($toolbarElem, "i." + iconExitFullScreenText);
          var config = editor.config;
          $iconElem.removeClass(iconExitFullScreenText);
          $iconElem.addClass(iconFullScreenText);
          $editorParent.removeClass(classfullScreenEditor);
          $editorParent.css("z-index", "auto");
          $textContainerElem.css("height", config.height + "px");
        };
        var initFullScreen = function initFullScreen2(editor) {
          if (editor.textSelector)
            return;
          if (!editor.config.showFullScreen)
            return;
          var $toolbarElem = editor.$toolbarElem;
          var $elem = dom_core_1["default"]('<div class="w-e-menu" data-title="\u5168\u5C4F">\n            <i class="' + iconFullScreenText + '"></i>\n        </div>');
          $elem.on("click", function(e) {
            var _context;
            var $elemIcon = (0, _find["default"])(_context = dom_core_1["default"](e.currentTarget)).call(_context, "i");
            if ($elemIcon.hasClass(iconFullScreenText)) {
              $elem.attr("data-title", "\u53D6\u6D88\u5168\u5C4F");
              exports2.setFullScreen(editor);
            } else {
              $elem.attr("data-title", "\u5168\u5C4F");
              exports2.setUnFullScreen(editor);
            }
          });
          $toolbarElem.append($elem);
        };
        exports2["default"] = initFullScreen;
      },
      function(module2, exports2, __webpack_require__) {
        var api = __webpack_require__(20);
        var content = __webpack_require__(422);
        content = content.__esModule ? content.default : content;
        if (typeof content === "string") {
          content = [[module2.i, content, ""]];
        }
        var options = {};
        options.insert = "head";
        options.singleton = false;
        api(content, options);
        module2.exports = content.locals || {};
      },
      function(module2, exports2, __webpack_require__) {
        var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(21);
        exports2 = ___CSS_LOADER_API_IMPORT___(false);
        exports2.push([module2.i, ".w-e-full-screen-editor {\n  position: fixed;\n  width: 100%!important;\n  height: 100%!important;\n  left: 0;\n  top: 0;\n}\n", ""]);
        module2.exports = exports2;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _find = _interopRequireDefault(__webpack_require__(29));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var scrollToHead = function scrollToHead2(editor, id) {
          var _context;
          var $textElem = editor.isEnable ? editor.$textElem : (0, _find["default"])(_context = editor.$textContainerElem).call(_context, ".w-e-content-mantle");
          var $targetHead = (0, _find["default"])($textElem).call($textElem, "[id='" + id + "']");
          var targetTop = $targetHead.getOffsetData().top;
          $textElem.scrollTop(targetTop);
        };
        exports2["default"] = scrollToHead;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var style_1 = tslib_1.__importDefault(__webpack_require__(129));
        var tier = {
          menu: 2,
          panel: 2,
          toolbar: 1,
          tooltip: 1,
          textContainer: 1
        };
        var ZIndex = function() {
          function ZIndex2() {
            this.tier = tier;
            this.baseZIndex = style_1["default"].zIndex;
          }
          ZIndex2.prototype.get = function(tierName) {
            if (tierName && this.tier[tierName]) {
              return this.baseZIndex + this.tier[tierName];
            }
            return this.baseZIndex;
          };
          ZIndex2.prototype.init = function(editor) {
            if (this.baseZIndex == style_1["default"].zIndex) {
              this.baseZIndex = editor.config.zIndex;
            }
          };
          return ZIndex2;
        }();
        exports2["default"] = ZIndex;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _filter = _interopRequireDefault(__webpack_require__(70));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var mutation_1 = tslib_1.__importDefault(__webpack_require__(426));
        var util_1 = __webpack_require__(6);
        var const_1 = __webpack_require__(7);
        function mutationsFilter(mutations, tar) {
          return (0, _filter["default"])(mutations).call(mutations, function(_a) {
            var type = _a.type, target = _a.target, attributeName = _a.attributeName;
            return type != "attributes" || type == "attributes" && (attributeName == "contenteditable" || target != tar);
          });
        }
        var Change = function(_super) {
          tslib_1.__extends(Change2, _super);
          function Change2(editor) {
            var _this = _super.call(this, function(mutations, observer) {
              var _a;
              mutations = mutationsFilter(mutations, observer.target);
              (_a = _this.data).push.apply(_a, mutations);
              if (!editor.isCompatibleMode) {
                if (!editor.isComposing) {
                  return _this.asyncSave();
                }
              } else {
                _this.asyncSave();
              }
            }) || this;
            _this.editor = editor;
            _this.data = [];
            _this.asyncSave = const_1.EMPTY_FN;
            return _this;
          }
          Change2.prototype.save = function() {
            if (this.data.length) {
              this.editor.history.save(this.data);
              this.data.length = 0;
              this.emit();
            }
          };
          Change2.prototype.emit = function() {
            var _context;
            (0, _forEach["default"])(_context = this.editor.txt.eventHooks.changeEvents).call(_context, function(fn) {
              return fn();
            });
          };
          Change2.prototype.observe = function() {
            var _this = this;
            _super.prototype.observe.call(this, this.editor.$textElem.elems[0]);
            var timeout = this.editor.config.onchangeTimeout;
            this.asyncSave = util_1.debounce(function() {
              _this.save();
            }, timeout);
            if (!this.editor.isCompatibleMode) {
              this.editor.$textElem.on("compositionend", function() {
                _this.asyncSave();
              });
            }
          };
          return Change2;
        }(mutation_1["default"]);
        exports2["default"] = Change;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var Mutation = function() {
          function Mutation2(fn, options) {
            var _this = this;
            this.options = {
              subtree: true,
              childList: true,
              attributes: true,
              attributeOldValue: true,
              characterData: true,
              characterDataOldValue: true
            };
            this.callback = function(mutations) {
              fn(mutations, _this);
            };
            this.observer = new MutationObserver(this.callback);
            options && (this.options = options);
          }
          (0, _defineProperty2["default"])(Mutation2.prototype, "target", {
            get: function get() {
              return this.node;
            },
            enumerable: false,
            configurable: true
          });
          Mutation2.prototype.observe = function(node) {
            if (!(this.node instanceof Node)) {
              this.node = node;
              this.connect();
            }
          };
          Mutation2.prototype.connect = function() {
            if (this.node) {
              this.observer.observe(this.node, this.options);
              return this;
            }
            throw new Error("\u8FD8\u672A\u521D\u59CB\u5316\u7ED1\u5B9A\uFF0C\u8BF7\u60A8\u5148\u7ED1\u5B9A\u6709\u6548\u7684 Node \u8282\u70B9");
          };
          Mutation2.prototype.disconnect = function() {
            var list = this.observer.takeRecords();
            list.length && this.callback(list);
            this.observer.disconnect();
          };
          return Mutation2;
        }();
        exports2["default"] = Mutation;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var content_1 = tslib_1.__importDefault(__webpack_require__(428));
        var scroll_1 = tslib_1.__importDefault(__webpack_require__(435));
        var range_1 = tslib_1.__importDefault(__webpack_require__(436));
        var History = function() {
          function History2(editor) {
            this.editor = editor;
            this.content = new content_1["default"](editor);
            this.scroll = new scroll_1["default"](editor);
            this.range = new range_1["default"](editor);
          }
          (0, _defineProperty2["default"])(History2.prototype, "size", {
            get: function get() {
              return this.scroll.size;
            },
            enumerable: false,
            configurable: true
          });
          History2.prototype.observe = function() {
            this.content.observe();
            this.scroll.observe();
            !this.editor.isCompatibleMode && this.range.observe();
          };
          History2.prototype.save = function(mutations) {
            if (mutations.length) {
              this.content.save(mutations);
              this.scroll.save();
              !this.editor.isCompatibleMode && this.range.save();
            }
          };
          History2.prototype.revoke = function() {
            this.editor.change.disconnect();
            var res = this.content.revoke();
            if (res) {
              this.scroll.revoke();
              if (!this.editor.isCompatibleMode) {
                this.range.revoke();
                this.editor.$textElem.focus();
              }
            }
            this.editor.change.connect();
            res && this.editor.change.emit();
          };
          History2.prototype.restore = function() {
            this.editor.change.disconnect();
            var res = this.content.restore();
            if (res) {
              this.scroll.restore();
              if (!this.editor.isCompatibleMode) {
                this.range.restore();
                this.editor.$textElem.focus();
              }
            }
            this.editor.change.connect();
            res && this.editor.change.emit();
          };
          return History2;
        }();
        exports2["default"] = History;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var node_1 = tslib_1.__importDefault(__webpack_require__(429));
        var html_1 = tslib_1.__importDefault(__webpack_require__(433));
        var ContentCache = function() {
          function ContentCache2(editor) {
            this.editor = editor;
          }
          ContentCache2.prototype.observe = function() {
            if (this.editor.isCompatibleMode) {
              this.cache = new html_1["default"](this.editor);
            } else {
              this.cache = new node_1["default"](this.editor);
            }
            this.cache.observe();
          };
          ContentCache2.prototype.save = function(mutations) {
            if (this.editor.isCompatibleMode) {
              this.cache.save();
            } else {
              this.cache.compile(mutations);
            }
          };
          ContentCache2.prototype.revoke = function() {
            var _a;
            return (_a = this.cache) === null || _a === void 0 ? void 0 : _a.revoke();
          };
          ContentCache2.prototype.restore = function() {
            var _a;
            return (_a = this.cache) === null || _a === void 0 ? void 0 : _a.restore();
          };
          return ContentCache2;
        }();
        exports2["default"] = ContentCache;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var cache_1 = tslib_1.__importDefault(__webpack_require__(99));
        var compile_1 = tslib_1.__importDefault(__webpack_require__(431));
        var decompilation_1 = __webpack_require__(432);
        var NodeCache = function(_super) {
          tslib_1.__extends(NodeCache2, _super);
          function NodeCache2(editor) {
            var _this = _super.call(this, editor.config.historyMaxSize) || this;
            _this.editor = editor;
            return _this;
          }
          NodeCache2.prototype.observe = function() {
            this.resetMaxSize(this.editor.config.historyMaxSize);
          };
          NodeCache2.prototype.compile = function(data) {
            this.save(compile_1["default"](data));
            return this;
          };
          NodeCache2.prototype.revoke = function() {
            return _super.prototype.revoke.call(this, function(data) {
              decompilation_1.revoke(data);
            });
          };
          NodeCache2.prototype.restore = function() {
            return _super.prototype.restore.call(this, function(data) {
              decompilation_1.restore(data);
            });
          };
          return NodeCache2;
        }(cache_1["default"]);
        exports2["default"] = NodeCache;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.CeilStack = void 0;
        var CeilStack = function() {
          function CeilStack2(max) {
            if (max === void 0) {
              max = 0;
            }
            this.data = [];
            this.max = 0;
            this.reset = false;
            max = Math.abs(max);
            max && (this.max = max);
          }
          CeilStack2.prototype.resetMax = function(maxSize) {
            maxSize = Math.abs(maxSize);
            if (!this.reset && !isNaN(maxSize)) {
              this.max = maxSize;
              this.reset = true;
            }
          };
          (0, _defineProperty2["default"])(CeilStack2.prototype, "size", {
            get: function get() {
              return this.data.length;
            },
            enumerable: false,
            configurable: true
          });
          CeilStack2.prototype.instack = function(data) {
            this.data.unshift(data);
            if (this.max && this.size > this.max) {
              this.data.length = this.max;
            }
            return this;
          };
          CeilStack2.prototype.outstack = function() {
            return this.data.shift();
          };
          CeilStack2.prototype.clear = function() {
            this.data.length = 0;
            return this;
          };
          return CeilStack2;
        }();
        exports2.CeilStack = CeilStack;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _indexOf = _interopRequireDefault(__webpack_require__(27));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.compliePosition = exports2.complieNodes = exports2.compileValue = exports2.compileType = void 0;
        var util_1 = __webpack_require__(6);
        function compileType(data) {
          switch (data) {
            case "childList":
              return "node";
            case "attributes":
              return "attr";
            default:
              return "text";
          }
        }
        exports2.compileType = compileType;
        function compileValue(data) {
          switch (data.type) {
            case "attributes":
              return data.target.getAttribute(data.attributeName) || "";
            case "characterData":
              return data.target.textContent;
            default:
              return "";
          }
        }
        exports2.compileValue = compileValue;
        function complieNodes(data) {
          var temp = {};
          if (data.addedNodes.length) {
            temp.add = util_1.toArray(data.addedNodes);
          }
          if (data.removedNodes.length) {
            temp.remove = util_1.toArray(data.removedNodes);
          }
          return temp;
        }
        exports2.complieNodes = complieNodes;
        function compliePosition(data) {
          var temp;
          if (data.previousSibling) {
            temp = {
              type: "before",
              target: data.previousSibling
            };
          } else if (data.nextSibling) {
            temp = {
              type: "after",
              target: data.nextSibling
            };
          } else {
            temp = {
              type: "parent",
              target: data.target
            };
          }
          return temp;
        }
        exports2.compliePosition = compliePosition;
        var tag = ["UL", "OL", "H1", "H2", "H3", "H4", "H5", "H6"];
        function compile(data) {
          var temp = [];
          var removeNode = false;
          var removeCache = [];
          (0, _forEach["default"])(data).call(data, function(record, index2) {
            var item = {
              type: compileType(record.type),
              target: record.target,
              attr: record.attributeName || "",
              value: compileValue(record) || "",
              oldValue: record.oldValue || "",
              nodes: complieNodes(record),
              position: compliePosition(record)
            };
            temp.push(item);
            if (!util_1.UA.isFirefox) {
              return;
            }
            if (removeNode && record.addedNodes.length && record.addedNodes[0].nodeType == 1) {
              var replenishNode = record.addedNodes[0];
              var replenishData = {
                type: "node",
                target: replenishNode,
                attr: "",
                value: "",
                oldValue: "",
                nodes: {
                  add: [removeNode]
                },
                position: {
                  type: "parent",
                  target: replenishNode
                }
              };
              if ((0, _indexOf["default"])(tag).call(tag, replenishNode.nodeName) != -1) {
                replenishData.nodes.add = util_1.toArray(replenishNode.childNodes);
                temp.push(replenishData);
              } else if (removeNode.nodeType == 3) {
                if (contains(replenishNode, removeCache)) {
                  replenishData.nodes.add = util_1.toArray(replenishNode.childNodes);
                }
                temp.push(replenishData);
              } else if ((0, _indexOf["default"])(tag).call(tag, record.target.nodeName) == -1 && contains(replenishNode, removeCache)) {
                replenishData.nodes.add = util_1.toArray(replenishNode.childNodes);
                temp.push(replenishData);
              }
            }
            if (item.type == "node" && record.removedNodes.length == 1) {
              removeNode = record.removedNodes[0];
              removeCache.push(removeNode);
            } else {
              removeNode = false;
              removeCache.length = 0;
            }
          });
          return temp;
        }
        exports2["default"] = compile;
        function contains(tar, childs) {
          var count = 0;
          for (var i = childs.length - 1; i > 0; i--) {
            if (tar.contains(childs[i])) {
              count++;
            } else {
              break;
            }
          }
          return count;
        }
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        var _entries = _interopRequireDefault(__webpack_require__(94));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.restore = exports2.revoke = void 0;
        function insertNode(data, list) {
          var reference = data.position.target;
          switch (data.position.type) {
            case "before":
              if (reference.nextSibling) {
                reference = reference.nextSibling;
                (0, _forEach["default"])(list).call(list, function(item) {
                  data.target.insertBefore(item, reference);
                });
              } else {
                (0, _forEach["default"])(list).call(list, function(item) {
                  data.target.appendChild(item);
                });
              }
              break;
            case "after":
              (0, _forEach["default"])(list).call(list, function(item) {
                data.target.insertBefore(item, reference);
              });
              break;
            default:
              (0, _forEach["default"])(list).call(list, function(item) {
                reference.appendChild(item);
              });
              break;
          }
        }
        function revokeNode(data) {
          for (var _i = 0, _a = (0, _entries["default"])(data.nodes); _i < _a.length; _i++) {
            var _b = _a[_i], relative = _b[0], list = _b[1];
            switch (relative) {
              case "add":
                (0, _forEach["default"])(list).call(list, function(item) {
                  data.target.removeChild(item);
                });
                break;
              default: {
                insertNode(data, list);
                break;
              }
            }
          }
        }
        function revokeAttr(data) {
          var target = data.target;
          if (data.oldValue == null) {
            target.removeAttribute(data.attr);
          } else {
            target.setAttribute(data.attr, data.oldValue);
          }
        }
        function revokeText(data) {
          data.target.textContent = data.oldValue;
        }
        var revokeFns = {
          node: revokeNode,
          text: revokeText,
          attr: revokeAttr
        };
        function revoke(data) {
          for (var i = data.length - 1; i > -1; i--) {
            var item = data[i];
            revokeFns[item.type](item);
          }
        }
        exports2.revoke = revoke;
        function restoreNode(data) {
          for (var _i = 0, _a = (0, _entries["default"])(data.nodes); _i < _a.length; _i++) {
            var _b = _a[_i], relative = _b[0], list = _b[1];
            switch (relative) {
              case "add": {
                insertNode(data, list);
                break;
              }
              default: {
                (0, _forEach["default"])(list).call(list, function(item) {
                  item.parentNode.removeChild(item);
                });
                break;
              }
            }
          }
        }
        function restoreText(data) {
          data.target.textContent = data.value;
        }
        function restoreAttr(data) {
          data.target.setAttribute(data.attr, data.value);
        }
        var restoreFns = {
          node: restoreNode,
          text: restoreText,
          attr: restoreAttr
        };
        function restore(data) {
          for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            restoreFns[item.type](item);
          }
        }
        exports2.restore = restore;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var chain_1 = __webpack_require__(434);
        var HtmlCache = function() {
          function HtmlCache2(editor) {
            this.editor = editor;
            this.data = new chain_1.TailChain();
          }
          HtmlCache2.prototype.observe = function() {
            this.data.resetMax(this.editor.config.historyMaxSize);
            this.data.insertLast(this.editor.$textElem.html());
          };
          HtmlCache2.prototype.save = function() {
            this.data.insertLast(this.editor.$textElem.html());
            return this;
          };
          HtmlCache2.prototype.revoke = function() {
            var data = this.data.prev();
            if (data) {
              this.editor.$textElem.html(data);
              return true;
            }
            return false;
          };
          HtmlCache2.prototype.restore = function() {
            var data = this.data.next();
            if (data) {
              this.editor.$textElem.html(data);
              return true;
            }
            return false;
          };
          return HtmlCache2;
        }();
        exports2["default"] = HtmlCache;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _splice = _interopRequireDefault(__webpack_require__(91));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.TailChain = void 0;
        var TailChain = function() {
          function TailChain2() {
            this.data = [];
            this.max = 0;
            this.point = 0;
            this.isRe = false;
          }
          TailChain2.prototype.resetMax = function(maxSize) {
            maxSize = Math.abs(maxSize);
            maxSize && (this.max = maxSize);
          };
          (0, _defineProperty2["default"])(TailChain2.prototype, "size", {
            get: function get() {
              return this.data.length;
            },
            enumerable: false,
            configurable: true
          });
          TailChain2.prototype.insertLast = function(data) {
            if (this.isRe) {
              var _context;
              (0, _splice["default"])(_context = this.data).call(_context, this.point + 1);
              this.isRe = false;
            }
            this.data.push(data);
            while (this.max && this.size > this.max) {
              this.data.shift();
            }
            this.point = this.size - 1;
            return this;
          };
          TailChain2.prototype.current = function() {
            return this.data[this.point];
          };
          TailChain2.prototype.prev = function() {
            !this.isRe && (this.isRe = true);
            this.point--;
            if (this.point < 0) {
              this.point = 0;
              return void 0;
            }
            return this.current();
          };
          TailChain2.prototype.next = function() {
            !this.isRe && (this.isRe = true);
            this.point++;
            if (this.point >= this.size) {
              this.point = this.size - 1;
              return void 0;
            }
            return this.current();
          };
          return TailChain2;
        }();
        exports2.TailChain = TailChain;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var cache_1 = tslib_1.__importDefault(__webpack_require__(99));
        var ScrollCache = function(_super) {
          tslib_1.__extends(ScrollCache2, _super);
          function ScrollCache2(editor) {
            var _this = _super.call(this, editor.config.historyMaxSize) || this;
            _this.editor = editor;
            _this.last = 0;
            _this.target = editor.$textElem.elems[0];
            return _this;
          }
          ScrollCache2.prototype.observe = function() {
            var _this = this;
            this.target = this.editor.$textElem.elems[0];
            this.editor.$textElem.on("scroll", function() {
              _this.last = _this.target.scrollTop;
            });
            this.resetMaxSize(this.editor.config.historyMaxSize);
          };
          ScrollCache2.prototype.save = function() {
            _super.prototype.save.call(this, [this.last, this.target.scrollTop]);
            return this;
          };
          ScrollCache2.prototype.revoke = function() {
            var _this = this;
            return _super.prototype.revoke.call(this, function(data) {
              _this.target.scrollTop = data[0];
            });
          };
          ScrollCache2.prototype.restore = function() {
            var _this = this;
            return _super.prototype.restore.call(this, function(data) {
              _this.target.scrollTop = data[1];
            });
          };
          return ScrollCache2;
        }(cache_1["default"]);
        exports2["default"] = ScrollCache;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var cache_1 = tslib_1.__importDefault(__webpack_require__(99));
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        var util_1 = __webpack_require__(6);
        function rangeToObject(range) {
          return {
            start: [range.startContainer, range.startOffset],
            end: [range.endContainer, range.endOffset],
            root: range.commonAncestorContainer,
            collapsed: range.collapsed
          };
        }
        var RangeCache = function(_super) {
          tslib_1.__extends(RangeCache2, _super);
          function RangeCache2(editor) {
            var _this = _super.call(this, editor.config.historyMaxSize) || this;
            _this.editor = editor;
            _this.lastRange = rangeToObject(document.createRange());
            _this.root = editor.$textElem.elems[0];
            _this.updateLastRange = util_1.debounce(function() {
              _this.lastRange = rangeToObject(_this.rangeHandle);
            }, editor.config.onchangeTimeout);
            return _this;
          }
          (0, _defineProperty2["default"])(RangeCache2.prototype, "rangeHandle", {
            get: function get() {
              var selection = document.getSelection();
              return selection && selection.rangeCount ? selection.getRangeAt(0) : document.createRange();
            },
            enumerable: false,
            configurable: true
          });
          RangeCache2.prototype.observe = function() {
            var self2 = this;
            this.root = this.editor.$textElem.elems[0];
            this.resetMaxSize(this.editor.config.historyMaxSize);
            function selectionchange() {
              var handle = self2.rangeHandle;
              if (self2.root === handle.commonAncestorContainer || self2.root.contains(handle.commonAncestorContainer)) {
                if (!self2.editor.isComposing) {
                  self2.updateLastRange();
                }
              }
            }
            function deletecallback(e) {
              if (e.key == "Backspace" || e.key == "Delete") {
                self2.updateLastRange();
              }
            }
            dom_core_1["default"](document).on("selectionchange", selectionchange);
            this.editor.beforeDestroy(function() {
              dom_core_1["default"](document).off("selectionchange", selectionchange);
            });
            self2.editor.$textElem.on("keydown", deletecallback);
          };
          RangeCache2.prototype.save = function() {
            var current = rangeToObject(this.rangeHandle);
            _super.prototype.save.call(this, [this.lastRange, current]);
            this.lastRange = current;
            return this;
          };
          RangeCache2.prototype.set = function(range) {
            try {
              if (range) {
                var handle = this.rangeHandle;
                handle.setStart.apply(handle, range.start);
                handle.setEnd.apply(handle, range.end);
                this.editor.menus.changeActive();
                return true;
              }
            } catch (err) {
              return false;
            }
            return false;
          };
          RangeCache2.prototype.revoke = function() {
            var _this = this;
            return _super.prototype.revoke.call(this, function(data) {
              _this.set(data[0]);
            });
          };
          RangeCache2.prototype.restore = function() {
            var _this = this;
            return _super.prototype.restore.call(this, function(data) {
              _this.set(data[1]);
            });
          };
          return RangeCache2;
        }(cache_1["default"]);
        exports2["default"] = RangeCache;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _find = _interopRequireDefault(__webpack_require__(29));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var tslib_1 = __webpack_require__(2);
        var dom_core_1 = tslib_1.__importDefault(__webpack_require__(3));
        __webpack_require__(438);
        function disableInit(editor) {
          var isCurtain = false;
          var $contentDom;
          var $menuDom;
          editor.txt.eventHooks.changeEvents.push(function() {
            if (isCurtain) {
              (0, _find["default"])($contentDom).call($contentDom, ".w-e-content-preview").html(editor.$textElem.html());
            }
          });
          function disable() {
            if (isCurtain)
              return;
            editor.$textElem.hide();
            var textContainerZindexValue = editor.zIndex.get("textContainer");
            var content = editor.txt.html();
            $contentDom = dom_core_1["default"]('<div class="w-e-content-mantle" style="z-index:' + textContainerZindexValue + '">\n                <div class="w-e-content-preview w-e-text">' + content + "</div>\n            </div>");
            editor.$textContainerElem.append($contentDom);
            var menuZindexValue = editor.zIndex.get("menu");
            $menuDom = dom_core_1["default"]('<div class="w-e-menue-mantle" style="z-index:' + menuZindexValue + '"></div>');
            editor.$toolbarElem.append($menuDom);
            isCurtain = true;
            editor.isEnable = false;
          }
          function enable() {
            if (!isCurtain)
              return;
            $contentDom.remove();
            $menuDom.remove();
            editor.$textElem.show();
            isCurtain = false;
            editor.isEnable = true;
          }
          return {
            disable,
            enable
          };
        }
        exports2["default"] = disableInit;
      },
      function(module2, exports2, __webpack_require__) {
        var api = __webpack_require__(20);
        var content = __webpack_require__(439);
        content = content.__esModule ? content.default : content;
        if (typeof content === "string") {
          content = [[module2.i, content, ""]];
        }
        var options = {};
        options.insert = "head";
        options.singleton = false;
        api(content, options);
        module2.exports = content.locals || {};
      },
      function(module2, exports2, __webpack_require__) {
        var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(21);
        exports2 = ___CSS_LOADER_API_IMPORT___(false);
        exports2.push([module2.i, ".w-e-content-mantle {\n  width: 100%;\n  height: 100%;\n  overflow-y: auto;\n}\n.w-e-content-mantle .w-e-content-preview {\n  width: 100%;\n  min-height: 100%;\n  padding: 0 10px;\n  line-height: 1.5;\n}\n.w-e-content-mantle .w-e-content-preview img {\n  cursor: default;\n}\n.w-e-content-mantle .w-e-content-preview img:hover {\n  box-shadow: none;\n}\n.w-e-menue-mantle {\n  position: absolute;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  left: 0;\n}\n", ""]);
        module2.exports = exports2;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        var SelectionChange = function() {
          function SelectionChange2(editor) {
            var _this = this;
            this.editor = editor;
            var init = function init2() {
              var activeElement = document.activeElement;
              if (activeElement === editor.$textElem.elems[0]) {
                _this.emit();
              }
            };
            window.document.addEventListener("selectionchange", init);
            this.editor.beforeDestroy(function() {
              window.document.removeEventListener("selectionchange", init);
            });
          }
          SelectionChange2.prototype.emit = function() {
            var _a;
            var onSelectionChange = this.editor.config.onSelectionChange;
            if (onSelectionChange) {
              var selection = this.editor.selection;
              selection.saveRange();
              if (!selection.isSelectionEmpty())
                onSelectionChange({
                  text: selection.getSelectionText(),
                  html: (_a = selection.getSelectionContainerElem()) === null || _a === void 0 ? void 0 : _a.elems[0].innerHTML,
                  selection
                });
            }
          };
          return SelectionChange2;
        }();
        exports2["default"] = SelectionChange;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        var _assign = _interopRequireDefault(__webpack_require__(128));
        var _entries = _interopRequireDefault(__webpack_require__(94));
        var _forEach = _interopRequireDefault(__webpack_require__(4));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
        exports2.registerPlugin = void 0;
        var tslib_1 = __webpack_require__(2);
        var editor_1 = tslib_1.__importDefault(__webpack_require__(87));
        var util_1 = __webpack_require__(6);
        function registerPlugin(name, options, memory) {
          if (!name) {
            throw new TypeError("name is not define");
          }
          if (!options) {
            throw new TypeError("options is not define");
          }
          if (!options.intention) {
            throw new TypeError("options.intention is not define");
          }
          if (options.intention && typeof options.intention !== "function") {
            throw new TypeError("options.intention is not function");
          }
          if (memory[name]) {
            console.warn("plugin " + name + " \u5DF2\u5B58\u5728\uFF0C\u5DF2\u8986\u76D6\u3002");
          }
          memory[name] = options;
        }
        exports2.registerPlugin = registerPlugin;
        function initPlugins(editor) {
          var plugins = (0, _assign["default"])({}, util_1.deepClone(editor_1["default"].globalPluginsFunctionList), util_1.deepClone(editor.pluginsFunctionList));
          var values = (0, _entries["default"])(plugins);
          (0, _forEach["default"])(values).call(values, function(_a) {
            var name = _a[0], options = _a[1];
            console.info("plugin " + name + " initializing");
            var intention = options.intention, config = options.config;
            intention(editor, config);
            console.info("plugin " + name + " initialization complete");
          });
        }
        exports2["default"] = initPlugins;
      },
      function(module2, exports2, __webpack_require__) {
        var _interopRequireDefault = __webpack_require__(0);
        var _defineProperty2 = _interopRequireDefault(__webpack_require__(1));
        (0, _defineProperty2["default"])(exports2, "__esModule", {
          value: true
        });
      }
    ])["default"];
  });
})(wangEditor);
var E = /* @__PURE__ */ getDefaultExportFromCjs(wangEditor.exports);
var IFormProps = {
  options: {
    type: Array,
    required: true,
    default: () => []
  },
  httpRequest: {
    type: Function
  }
};
const _hoisted_1 = { class: "v-form__wrapper" };
const _hoisted_2 = {
  key: 2,
  id: "vuieditor"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: IFormProps,
  emits: [
    "on-preview",
    "on-remove",
    "on-success",
    "on-error",
    "on-progress",
    "on-change",
    "on-exceed",
    "before-upload",
    "before-remove"
  ],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    let form = ref();
    let model = ref(null);
    let rules = ref(null);
    let edit = ref();
    const handleOnPreview = (file) => {
      emits("on-preview", file);
    };
    const handleOnRemove = (file, fileList) => {
      emits("on-remove", { file, fileList });
    };
    const handleOnSuccess = (response, file, fileList) => {
      let uploadItem = props.options.find((item) => item.type === "upload");
      if (uploadItem) {
        model.value[uploadItem.prop] = {
          response,
          file,
          fileList
        };
      }
      emits("on-success", { response, file, fileList });
    };
    const handleOnError = (error, file, fileList) => {
      emits("on-error", { error, file, fileList });
    };
    const handleOnProgress = (evt, file, fileList) => {
      emits("on-progress", { evt, file, fileList });
    };
    const handleOnChange = (file, fileList) => {
      emits("on-change", { file, fileList });
    };
    const handleBeforeUpload = (file) => {
      return emits("before-upload", file);
    };
    const handleBeforeRemove = (file, fileList) => {
      return emits("before-remove", { file, fileList });
    };
    const handleOnExceed = (files, uploadFiles) => {
      emits("on-exceed", { files, uploadFiles });
    };
    const resetFields = () => {
      form.value.resetFields();
      if (props.options && props.options.length) {
        let editorItem = props.options.find((item) => item.type === "editor");
        edit.value.txt.html(editorItem == null ? void 0 : editorItem.value);
      }
    };
    const validate = () => {
      return form.value.validate;
    };
    const getFormData = () => {
      return model.value;
    };
    expose({
      resetFields,
      validate,
      getFormData
    });
    let initForm = () => {
      if (props.options && props.options.length) {
        let _m = {};
        let _r = {};
        props.options.map((item) => {
          _m[item.prop] = item.value;
          _r[item.prop] = item.rules;
          if (item.type === "editor") {
            nextTick(() => {
              if (document.getElementById("vuieditor")) {
                const editor = new E("#vuieditor");
                editor.config.placeholder = item.placeholder || "\u8BF7\u8F93\u5165\u6B63\u6587";
                editor.create();
                editor.txt.html(item.value);
                editor.config.onchange = (newHtml) => {
                  model.value[item.prop] = newHtml;
                };
                edit.value = editor;
                form.value["editor"] = editor;
              }
            });
          }
        });
        model.value = cloneDeep_1(_m);
        rules.value = cloneDeep_1(_r);
      }
    };
    onMounted(() => {
      initForm();
    });
    watch(() => props.options, (val) => {
      initForm();
    }, { deep: true });
    return (_ctx, _cache) => {
      const _component_el_upload = resolveComponent("el-upload");
      const _component_el_form_item = resolveComponent("el-form-item");
      const _component_el_form = resolveComponent("el-form");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        unref(model) ? (openBlock(), createBlock(_component_el_form, mergeProps({ key: 0 }, _ctx.$attrs, {
          model: unref(model),
          rules: unref(rules),
          ref_key: "form",
          ref: form,
          "validate-on-rule-change": false
        }), {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (item, index2) => {
              return openBlock(), createElementBlock(Fragment, { key: index2 }, [
                !item.children || !item.children.length ? (openBlock(), createBlock(_component_el_form_item, {
                  key: 0,
                  label: item.label,
                  prop: item.prop
                }, {
                  default: withCtx(() => [
                    item.type !== "upload" && item.type !== "editor" ? (openBlock(), createBlock(resolveDynamicComponent(`el-${item.type}`), mergeProps({
                      key: 0,
                      placeholder: item.placeholder
                    }, item.attrs, {
                      modelValue: unref(model)[item.prop],
                      "onUpdate:modelValue": ($event) => unref(model)[item.prop] = $event
                    }), null, 16, ["placeholder", "modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                    item.type === "upload" ? (openBlock(), createBlock(_component_el_upload, mergeProps({ key: 1 }, item.uploadAttrs, {
                      "on-preview": handleOnPreview,
                      "on-remove": handleOnRemove,
                      "on-success": handleOnSuccess,
                      "on-error": handleOnError,
                      "on-progress": handleOnProgress,
                      "on-change": handleOnChange,
                      "on-exceed": handleOnExceed,
                      "before-upload": handleBeforeUpload,
                      "before-remove": handleBeforeRemove
                    }), {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "uploadArea"),
                        renderSlot(_ctx.$slots, "uploadTip")
                      ]),
                      _: 2
                    }, 1040)) : createCommentVNode("", true),
                    item.type === "editor" ? (openBlock(), createElementBlock("div", _hoisted_2)) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["label", "prop"])) : createCommentVNode("", true),
                item.children && item.children.length > 0 ? (openBlock(), createBlock(_component_el_form_item, {
                  key: 1,
                  label: item.label,
                  prop: item.prop
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(resolveDynamicComponent(`el-${item.type}`), mergeProps({
                      placeholder: item.placeholder
                    }, item.attrs, {
                      modelValue: unref(model)[item.prop],
                      "onUpdate:modelValue": ($event) => unref(model)[item.prop] = $event
                    }), {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(item.children, (child, i) => {
                          return openBlock(), createBlock(resolveDynamicComponent(`el-${child.type}`), {
                            key: i,
                            label: child.label,
                            value: child.value
                          }, null, 8, ["label", "value"]);
                        }), 128))
                      ]),
                      _: 2
                    }, 1040, ["placeholder", "modelValue", "onUpdate:modelValue"]))
                  ]),
                  _: 2
                }, 1032, ["label", "prop"])) : createCommentVNode("", true)
              ], 64);
            }), 128)),
            createVNode(_component_el_form_item, null, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "action", {
                  form: unref(form),
                  model: unref(model)
                })
              ]),
              _: 3
            })
          ]),
          _: 3
        }, 16, ["model", "rules"])) : createCommentVNode("", true)
      ]);
    };
  }
});
var index = {
  install(app) {
    app.component("v-form", _sfc_main);
  }
};
export { index as default };
