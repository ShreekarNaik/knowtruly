var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { demoAuditLog, demoClaims, demoMatchResults, demoProfile, demoRecruiterCandidates, demoResumeDetails, demoResumes, demoTemplates } from "./data";
var currentUser = {
    id: "demo-user",
    email: "sophia@knowtruly.me",
    name: "Sophia Carter",
    role: "student",
    profileId: "demo-profile"
};
export var demoAuth = {
    login: function (email, _password) {
        return __awaiter(this, void 0, void 0, function () {
            var normalized;
            return __generator(this, function (_a) {
                normalized = email.toLowerCase();
                if (normalized.includes("recruiter")) {
                    currentUser = {
                        id: "demo-recruiter",
                        email: email,
                        name: "Alex Rivera",
                        role: "recruiter"
                    };
                }
                else if (normalized.includes("issuer")) {
                    currentUser = {
                        id: "demo-issuer",
                        email: email,
                        name: "Credential Office",
                        role: "issuer"
                    };
                }
                else if (normalized.includes("admin")) {
                    currentUser = {
                        id: "demo-admin",
                        email: email,
                        name: "System Admin",
                        role: "admin"
                    };
                }
                else {
                    currentUser = {
                        id: "demo-user",
                        email: email,
                        name: "Sophia Carter",
                        role: "student",
                        profileId: "demo-profile"
                    };
                }
                return [2 /*return*/, {
                        access_token: "demo-token",
                        token_type: "bearer",
                        user: currentUser
                    }];
            });
        });
    },
    register: function (email, role) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                currentUser = {
                    id: "demo-".concat(role),
                    email: email,
                    name: "Demo User",
                    role: role
                };
                return [2 /*return*/, {
                        user_id: currentUser.id,
                        email: email,
                        access_token: "demo-token"
                    }];
            });
        });
    },
    getCurrentUser: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, currentUser];
            });
        });
    }
};
export var demoProfiles = {
    getProfile: function (_profileId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, demoProfile];
            });
        });
    },
    listProfiles: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, [demoProfile]];
            });
        });
    }
};
export var demoResumesApi = {
    listResumes: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, demoResumes];
            });
        });
    },
    getResumeDetail: function (resumeId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                return [2 /*return*/, (_a = demoResumeDetails[resumeId]) !== null && _a !== void 0 ? _a : demoResumeDetails["resume-1"]];
            });
        });
    },
    generateResume: function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var timestamp;
            return __generator(this, function (_a) {
                timestamp = new Date().toISOString();
                return [2 /*return*/, {
                        resume_id: "demo-generated",
                        snapshot_id: "snapshot-generated",
                        download_url: "/demo/resumes/generated.pdf",
                        generation_metadata: {
                            rephrasedSections: options.ai_rephrase ? ["summary"] : [],
                            templateUsed: "tmpl-modern",
                            generatedAt: timestamp
                        }
                    }];
            });
        });
    }
};
export var demoTemplatesApi = {
    listTemplates: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, demoTemplates];
            });
        });
    },
    getTemplateDetail: function (templateId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, demoTemplates.find(function (template) { return template.templateId === templateId; })];
            });
        });
    }
};
export var demoMatchmaker = {
    runMatch: function (_payload) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                return [2 /*return*/, {
                        matches: demoMatchResults,
                        query_embedding_id: "demo-query-embedding",
                        matched_at: (_b = (_a = demoMatchResults[0]) === null || _a === void 0 ? void 0 : _a.matchedAt) !== null && _b !== void 0 ? _b : new Date().toISOString()
                    }];
            });
        });
    }
};
export var demoRecruiterApi = {
    searchCandidates: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, demoRecruiterCandidates];
            });
        });
    },
    requestAccess: function (candidateId, roleId, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        request_id: "request-demo",
                        status: "pending",
                        expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
                        candidate_id: candidateId,
                        role_id: roleId,
                        message: message
                    }];
            });
        });
    }
};
export var demoIssuerApi = {
    listClaims: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, demoClaims];
            });
        });
    },
    signClaim: function () {
        return __awaiter(this, void 0, void 0, function () {
            var signedAt;
            return __generator(this, function (_a) {
                signedAt = new Date().toISOString();
                return [2 /*return*/, {
                        signature_id: "signature-demo",
                        signature: "demo-signature",
                        algorithm: "RSA-SHA256",
                        signed_at: signedAt,
                        signatureId: "signature-demo",
                        signedAt: signedAt
                    }];
            });
        });
    },
    verifySignature: function (_signatureId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                return [2 /*return*/, {
                        valid: true,
                        issuer_id: "issuer-knowtruly",
                        issuer_name: "KnowTruly Credentialing",
                        signed_at: new Date().toISOString(),
                        claim_payload: (_b = (_a = demoClaims[0]) === null || _a === void 0 ? void 0 : _a.claimPayload) !== null && _b !== void 0 ? _b : {}
                    }];
            });
        });
    }
};
export var demoAuditApi = {
    getAuditLogs: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, demoAuditLog];
            });
        });
    }
};
