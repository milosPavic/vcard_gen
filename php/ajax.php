<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/process_excel.php';

function api_response(bool $ok = false, string $message = '', array $data = []): array {
    return ['ok' => $ok, 'message' => $message, 'data' => $data];
}

$operator = $_GET['operator'] ?? '';

switch ($operator) {
    case 'import_excel':
        $response = import_excel();
        break;
    default:
        $response = api_response(false, 'Invalid operator');
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);

function import_excel(): array {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        return api_response(false, 'POST required');
    }

    if (!isset($_FILES['excel_file']) || $_FILES['excel_file']['error'] !== UPLOAD_ERR_OK) {
        return api_response(false, 'File required');
    }

    $result = getExcelPreview($_FILES['excel_file']['tmp_name']);

    if (isset($result['error'])) {
        return api_response(false, $result['error'], [
            'details' => $result['details'] ?? null,
            'trace' => $result['trace'] ?? null
        ]);
    }

    return api_response(true, 'Success', [
        'headers' => $result['headers'] ?? [],
        'rows' => $result['data'] ?? [],
        'total' => count($result['data'] ?? [])
    ]);
}