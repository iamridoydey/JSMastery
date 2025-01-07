"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield _1.client.set("name:1", "Prite Dey Srabonti");
        yield _1.client.expire("count", 10);
        const mresult = yield _1.client.mget(["name:1", "name:2", "user:1", "count"]);
        console.log(mresult);
    });
}
init();
