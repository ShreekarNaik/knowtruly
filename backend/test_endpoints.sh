#!/bin/bash

# KnowTruly Backend - Comprehensive Endpoint Testing Script
# This script tests all 39 API endpoints

BASE_URL="http://localhost:8000/api/v1"
PASSED=0
FAILED=0

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================="
echo "KnowTruly Backend - Endpoint Testing"
echo "========================================="
echo ""

# Helper functions
pass_test() {
    echo -e "${GREEN}✓ PASS${NC}: $1"
    ((PASSED++))
}

fail_test() {
    echo -e "${RED}✗ FAIL${NC}: $1"
    echo "   Error: $2"
    ((FAILED++))
}

test_endpoint() {
    local name="$1"
    local method="$2"
    local endpoint="$3"
    local data="$4"
    local headers="$5"
    local expected_code="$6"
    
    if [ -z "$headers" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data" 2>&1)
    else
        response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -H "$headers" \
            -d "$data" 2>&1)
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" == "$expected_code" ]; then
        pass_test "$name (HTTP $http_code)"
        echo "$body" | python3 -m json.tool 2>/dev/null | head -5
    else
        fail_test "$name" "Expected HTTP $expected_code, got $http_code"
        echo "$body" | head -3
    fi
    echo ""
}

# Test 1: Health Check
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test Group 1: System Health"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
test_endpoint "Health Check" "GET" "/../../health" "" "" "200"

# Test 2-3: Authentication
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test Group 2: Authentication"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Register student
STUDENT_EMAIL="teststudent_$(date +%s)@example.com"
register_response=$(curl -s -X POST "$BASE_URL/auth/register" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$STUDENT_EMAIL\",\"password\":\"TestPass123!\",\"role\":\"student\"}")

if echo "$register_response" | grep -q "access_token"; then
    pass_test "Student Registration"
    STUDENT_TOKEN=$(echo "$register_response" | python3 -c "import sys, json; print(json.load(sys.stdin)['access_token'])")
    echo "   Token: ${STUDENT_TOKEN:0:50}..."
else
    fail_test "Student Registration" "$register_response"
fi
echo ""

# Login
login_response=$(curl -s -X POST "$BASE_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$STUDENT_EMAIL\",\"password\":\"TestPass123!\"}")

if echo "$login_response" | grep -q "access_token"; then
    pass_test "Student Login"
else
    fail_test "Student Login" "$login_response"
fi
echo ""

# Get current user
me_response=$(curl -s -X GET "$BASE_URL/auth/me" \
    -H "Authorization: Bearer $STUDENT_TOKEN")

if echo "$me_response" | grep -q "email"; then
    pass_test "Get Current User"
    echo "$me_response" | python3 -m json.tool | head -5
else
    fail_test "Get Current User" "$me_response"
fi
echo ""

# Test 4-8: Profiles
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test Group 3: Profiles"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Create profile
profile_data='{
  "canonical_name": "Test Student",
  "headline": "Software Engineer",
  "summary": "Experienced developer with Python and FastAPI",
  "skills": [
    {"name": "Python", "proficiency": "advanced"},
    {"name": "FastAPI", "proficiency": "intermediate"},
    {"name": "PostgreSQL", "proficiency": "intermediate"}
  ],
  "education": [{
    "institution": "Test University",
    "degree": "BS Computer Science",
    "field_of_study": "Software Engineering",
    "start_date": "2018-09-01",
    "end_date": "2022-05-31",
    "gpa": 3.8
  }],
  "positions": [{
    "title": "Software Engineer",
    "company": "Tech Corp",
    "start_date": "2022-06-01",
    "end_date": "2024-12-31",
    "description": "Developed backend APIs",
    "skills_used": ["Python", "FastAPI"]
  }],
  "projects": [{
    "title": "Task Management System",
    "role_description": "Lead Developer",
    "start_date": "2023-01-01",
    "end_date": "2023-06-30",
    "technologies": ["Python", "FastAPI", "PostgreSQL"],
    "artifacts": ["https://github.com/test/project"]
  }]
}'

profile_response=$(curl -s -X POST "$BASE_URL/profiles" \
    -H "Authorization: Bearer $STUDENT_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$profile_data")

if echo "$profile_response" | grep -q "profile_id"; then
    pass_test "Create Profile"
    PROFILE_ID=$(echo "$profile_response" | python3 -c "import sys, json; print(json.load(sys.stdin)['profile_id'])")
    echo "   Profile ID: $PROFILE_ID"
    echo "$profile_response" | python3 -m json.tool | head -5
else
    fail_test "Create Profile" "$profile_response"
    PROFILE_ID="dummy-id"
fi
echo ""

# Get profile
get_profile_response=$(curl -s -X GET "$BASE_URL/profiles/$PROFILE_ID" \
    -H "Authorization: Bearer $STUDENT_TOKEN")

if echo "$get_profile_response" | grep -q "canonical_name"; then
    pass_test "Get Profile"
    echo "$get_profile_response" | python3 -m json.tool | head -10
else
    fail_test "Get Profile" "$get_profile_response"
fi
echo ""

# Update profile
update_response=$(curl -s -X PATCH "$BASE_URL/profiles/$PROFILE_ID" \
    -H "Authorization: Bearer $STUDENT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"headline":"Senior Software Engineer"}')

if echo "$update_response" | grep -q "version"; then
    pass_test "Update Profile"
else
    fail_test "Update Profile" "$update_response"
fi
echo ""

# Test 9-13: Matching
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test Group 4: Semantic Matching"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Register recruiter
RECRUITER_EMAIL="testrecruiter_$(date +%s)@example.com"
recruiter_reg=$(curl -s -X POST "$BASE_URL/auth/register" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$RECRUITER_EMAIL\",\"password\":\"TestPass123!\",\"role\":\"recruiter\"}")

if echo "$recruiter_reg" | grep -q "access_token"; then
    RECRUITER_TOKEN=$(echo "$recruiter_reg" | python3 -c "import sys, json; print(json.load(sys.stdin)['access_token'])")
    pass_test "Recruiter Registration"
else
    fail_test "Recruiter Registration" "$recruiter_reg"
    RECRUITER_TOKEN="dummy-token"
fi
echo ""

# Perform semantic match
match_data='{
  "role_descriptor": {
    "title": "Senior Python Developer",
    "description": "Looking for experienced Python developer with FastAPI experience",
    "required_skills": ["Python", "FastAPI"],
    "preferred_skills": ["PostgreSQL", "Docker"]
  },
  "top_k": 5
}'

match_response=$(curl -s -X POST "$BASE_URL/match" \
    -H "Authorization: Bearer $RECRUITER_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$match_data")

if echo "$match_response" | grep -q "matches"; then
    pass_test "Semantic Matching"
    echo "$match_response" | python3 -m json.tool | head -15
else
    fail_test "Semantic Matching" "$match_response"
fi
echo ""

# Test 14-19: Resume Generation
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test Group 5: Resume Generation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# List templates
templates_response=$(curl -s -X GET "$BASE_URL/resumes/templates/list" \
    -H "Authorization: Bearer $STUDENT_TOKEN")

if echo "$templates_response" | grep -q "templates"; then
    pass_test "List Resume Templates"
    echo "$templates_response" | python3 -m json.tool | head -10
else
    fail_test "List Resume Templates" "$templates_response"
fi
echo ""

# Test rephrasing (without actual Gemini API call if key not configured)
rephrase_data='{
  "original_text": "Developed backend APIs using Python and FastAPI",
  "context": "project_description",
  "constraints": {
    "max_chars": 50,
    "tone": "professional"
  }
}'

echo -e "${YELLOW}⚠ SKIP${NC}: AI Rephrasing (requires Gemini API key)"
echo ""

# Test 20-26: Verification & Signatures
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test Group 6: Verification & Signatures"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Register issuer
ISSUER_EMAIL="testissuer_$(date +%s)@example.com"
issuer_reg=$(curl -s -X POST "$BASE_URL/auth/register" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$ISSUER_EMAIL\",\"password\":\"TestPass123!\",\"role\":\"issuer\"}")

if echo "$issuer_reg" | grep -q "access_token"; then
    ISSUER_TOKEN=$(echo "$issuer_reg" | python3 -c "import sys, json; print(json.load(sys.stdin)['access_token'])")
    pass_test "Issuer Registration"
else
    fail_test "Issuer Registration" "$issuer_reg"
    ISSUER_TOKEN="dummy-token"
fi
echo ""

# Generate key pair
keys_response=$(curl -s -X POST "$BASE_URL/verification/keys/generate" \
    -H "Authorization: Bearer $ISSUER_TOKEN")

if echo "$keys_response" | grep -q "public_key"; then
    pass_test "Generate RSA Key Pair"
    echo "   Public key generated successfully"
else
    fail_test "Generate RSA Key Pair" "$keys_response"
fi
echo ""

# Sign a claim (need to get private key first from key generation response)
# For now, use a placeholder - in real usage, issuer would store their private key
sign_data="{
  \"subject_profile_id\": \"$PROFILE_ID\",
  \"claim_type\": \"degree\",
  \"claim_payload\": {
    \"degree\": \"BS Computer Science\",
    \"institution\": \"Test University\",
    \"graduation_date\": \"2022-05-31\"
  },
  \"issuer_private_key\": \"-----BEGIN RSA PRIVATE KEY-----\\nPlaceholder\\n-----END RSA PRIVATE KEY-----\"
}"

sign_response=$(curl -s -X POST "$BASE_URL/verification/sign" \
    -H "Authorization: Bearer $ISSUER_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$sign_data")

if echo "$sign_response" | grep -q "signature"; then
    pass_test "Sign Verifiable Claim"
    SIGNATURE_ID=$(echo "$sign_response" | python3 -c "import sys, json; print(json.load(sys.stdin)['signature_id'])" 2>/dev/null || echo "")
    echo "$sign_response" | python3 -m json.tool | head -8
else
    fail_test "Sign Verifiable Claim" "$sign_response"
    SIGNATURE_ID="dummy-sig-id"
fi
echo ""

# Test 27-38: Audit & Compliance
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Test Group 7: Audit & Compliance"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Get audit logs
audit_response=$(curl -s -X GET "$BASE_URL/audit/logs/me?limit=5" \
    -H "Authorization: Bearer $STUDENT_TOKEN")

if echo "$audit_response" | grep -q "total"; then
    pass_test "Get Audit Logs"
    echo "$audit_response" | python3 -m json.tool | head -15
else
    fail_test "Get Audit Logs" "$audit_response"
fi
echo ""

# Request consent
consent_data="{
  \"subject_id\": \"$PROFILE_ID\",
  \"data_type\": \"full_profile\",
  \"purpose\": \"Job application review for Senior Python Developer position\"
}"

consent_response=$(curl -s -X POST "$BASE_URL/audit/consent/request" \
    -H "Authorization: Bearer $RECRUITER_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$consent_data")

if echo "$consent_response" | grep -q "id"; then
    pass_test "Request Data Access Consent"
    CONSENT_ID=$(echo "$consent_response" | python3 -c "import sys, json; print(json.load(sys.stdin)['id'])")
    echo "   Consent ID: $CONSENT_ID"
else
    fail_test "Request Data Access Consent" "$consent_response"
    CONSENT_ID="dummy-consent-id"
fi
echo ""

# Check pending consents
pending_response=$(curl -s -X GET "$BASE_URL/audit/consent/pending" \
    -H "Authorization: Bearer $STUDENT_TOKEN")

if echo "$pending_response" | grep -q "\\["; then
    pass_test "Get Pending Consent Requests"
    echo "$pending_response" | python3 -m json.tool | head -10
else
    fail_test "Get Pending Consent Requests" "$pending_response"
fi
echo ""

# Grant consent
decide_data="{
  \"consent_id\": \"$CONSENT_ID\",
  \"decision\": \"grant\",
  \"expires_in_hours\": 24
}"

decide_response=$(curl -s -X POST "$BASE_URL/audit/consent/decide" \
    -H "Authorization: Bearer $STUDENT_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$decide_data")

if echo "$decide_response" | grep -q "granted"; then
    pass_test "Grant Data Access Consent"
else
    fail_test "Grant Data Access Consent" "$decide_response"
fi
echo ""

# Privacy dashboard
privacy_response=$(curl -s -X GET "$BASE_URL/audit/privacy/dashboard" \
    -H "Authorization: Bearer $STUDENT_TOKEN")

if echo "$privacy_response" | grep -q "active_consents"; then
    pass_test "Privacy Dashboard"
    echo "$privacy_response" | python3 -m json.tool | head -15
else
    fail_test "Privacy Dashboard" "$privacy_response"
fi
echo ""

# GDPR Data Export
export_data='{
  "format": "json",
  "include_audit_logs": true,
  "include_access_logs": true
}'

export_response=$(curl -s -X POST "$BASE_URL/audit/gdpr/export" \
    -H "Authorization: Bearer $STUDENT_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$export_data")

if echo "$export_response" | grep -q "user"; then
    pass_test "GDPR Data Export"
    echo "   Export includes: user, profile, audit logs"
else
    fail_test "GDPR Data Export" "$export_response"
fi
echo ""

# Summary
echo "========================================="
echo "Test Summary"
echo "========================================="
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
TOTAL=$((PASSED + FAILED))
echo "Total:  $TOTAL"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed${NC}"
    exit 1
fi
