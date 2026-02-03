<?php
require_once __DIR__ . '/../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

function excel_response(bool $ok, array $data = [], ?string $error = null, ?string $details = null, ?array $trace = null): array {
    $response = $ok ? $data : [];

    if ($error !== null) {
        $response['error'] = $error;
    }

    if ($details !== null) {
        $response['details'] = $details;
    }

    if ($trace !== null) {
        $response['trace'] = $trace;
    }

    return $response;
}

function getExcelPreview($filePath) {
    try {
        $spreadsheet = IOFactory::load($filePath);
        $worksheet = $spreadsheet->getSheet(0);
        $rows = $worksheet->toArray(null, false, false, true);

        $headerMapping = [];
        $dataRows = [];
        $headersFound = false;

        foreach ($rows as $row) {
            if (!$headersFound) {
                if (in_array('First Name', $row)) {
                    foreach ($row as $colIndex => $headerName) {
                        if (!empty(trim($headerName ?? ''))) {
                            $headerMapping[$headerName] = $colIndex;
                        }
                    }
                    $headersFound = true;
                }
            } else {
                $rowData = [];
                $hasContent = false;

                foreach ($headerMapping as $name => $colIndex) {
                    $val = $row[$colIndex] ?? '';

                    if (!empty(trim($val))) $hasContent = true;

                    $rowData[$name] = $val;
                }

                if ($hasContent) {
                    $dataRows[] = $rowData;
                }
            }
        }

        return excel_response(true, [
            'headers' => array_keys($headerMapping),
            'data' => $dataRows
        ]);

    } catch (Exception $e) {
        $trace = $e->getTrace();
        $errorFile = 'Unknown';
        $errorLine = 'Unknown';

        foreach ($trace as $step) {
            if (isset($step['file']) && strpos($step['file'], 'vendor') === false) {
                $errorFile = $step['file'];
                $errorLine = $step['line'];
                break;
            }
        }

        $traceArray = array_map(function($t) {
            return [
                'file' => $t['file'] ?? 'Unknown',
                'line' => $t['line'] ?? 0,
                'function' => $t['function'] ?? 'Unknown'
            ];
        }, array_slice($trace, 0, 5));

        return excel_response(
            false,
            [],
            $e->getMessage(),
            "File: $errorFile, Line: $errorLine",
            $traceArray
        );
    }
}