$ErrorActionPreference = "Stop"

$contextFile = ".\project-context.txt"
$codeFile = ".\project-code.txt"

if (-not (Test-Path $contextFile)) {
    Write-Host "ERROR: No existe project-context.txt" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $codeFile)) {
    Write-Host "ERROR: No existe project-code.txt" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host " PM4BE - PROJECT CHECK" -ForegroundColor Cyan
Write-Host " Qwen 2.5 Coder 7B" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

$context = Get-Content $contextFile -Raw
$code = Get-Content $codeFile -Raw

$prompt = @"
You are a senior NestJS, TypeScript, TypeORM and PostgreSQL software architect.

You are analyzing an existing backend project.

FIRST read and understand the PROJECT CONTEXT.

Then analyze the REAL SOURCE CODE.

================ PROJECT CONTEXT ================

$context

================ END PROJECT CONTEXT ============

================ SOURCE CODE ====================

$code

================ END SOURCE CODE ================

IMPORTANT RULES:

1. Do NOT modify any files.
2. Do NOT invent files, entities, endpoints or functionality.
3. The real source code is the final source of truth.
4. If the project-context conflicts with the source code, report the conflict.
5. Do not assume that a feature exists just because it is mentioned in the specification.
6. Identify inconsistencies between architecture, DTOs, entities, services, repositories and controllers.
7. Pay special attention to UUID handling.
8. Pay special attention to authentication and authorization.
9. Pay special attention to RolesGuard and AuthGuard.
10. Check Swagger decorators versus actual authentication.
11. Check DTO validation.
12. Check TypeORM relationships.
13. Check PostgreSQL-related problems.
14. Check file upload and Cloudinary integration.
15. Check duplicated functionality.
16. Check security issues.
17. Check possible runtime errors.
18. Check TypeScript problems.
19. Check architectural problems.
20. Do not recommend a complete rewrite unless absolutely necessary.

Produce an AUDIT REPORT.

Use this structure:

# 1. PROJECT UNDERSTANDING

Explain briefly what the backend does.

# 2. ARCHITECTURE

Explain the current architecture.

# 3. MODULES

List the modules and their responsibilities.

# 4. ENTITIES AND RELATIONSHIPS

List the entities and identify possible relationship problems.

# 5. AUTHENTICATION

Analyze signup, signin, JWT and AuthGuard.

# 6. AUTHORIZATION

Analyze Roles, RolesGuard and protected endpoints.

# 7. CONTROLLERS

Review all controllers.

For every problem report:

- File
- Endpoint
- Problem
- Severity
- Recommendation

# 8. DTOs AND VALIDATION

Check class-validator and Swagger.

# 9. TYPEORM / DATABASE

Check entities, relations, IDs and persistence.

# 10. FILE UPLOAD / CLOUDINARY

Check upload architecture and validation.

# 11. SECURITY

Identify security vulnerabilities or weaknesses.

# 12. CODE QUALITY

Identify duplication, naming problems and architectural inconsistencies.

# 13. SPECIFICATION VS IMPLEMENTATION

Compare the original business requirements with the current implementation.

# 14. CRITICAL PROBLEMS

List only high-priority problems.

# 15. IMPORTANT PROBLEMS

List medium-priority problems.

# 16. RECOMMENDED IMPROVEMENTS

List improvements that should be made after fixing bugs.

# 17. MISSING FUNCTIONALITY

Identify features described in the specification that are not implemented.

# 18. PRIORITY PLAN

Create a recommended order:

1. Critical
2. High
3. Medium
4. Low
5. Future improvements

Do NOT write replacement code yet.

The objective of this first analysis is to understand the project and identify problems.
"@

Write-Host "Enviando projeto para Qwen..." -ForegroundColor Yellow
Write-Host "Contexto: $((Get-Item $contextFile).Length) bytes" -ForegroundColor Gray
Write-Host "Código:    $((Get-Item $codeFile).Length) bytes" -ForegroundColor Gray
Write-Host ""

$prompt | ollama run qwen2.5-coder:7b