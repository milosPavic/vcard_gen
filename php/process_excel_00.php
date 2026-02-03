<?php
require_once __DIR__ . '/../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

function getExcelPreview($filePath) {
    try {
        $spreadsheet = IOFactory::load($filePath);
        $worksheet = $spreadsheet->getSheet(0); // Prvi sheet po indeksu
        $rows = $worksheet->toArray(null, false, false, true); // Zadržava formatiranje

        $headerMapping = [];
        $dataRows = [];
        $headersFound = false;

        foreach ($rows as $row) {
            // Tražimo zaglavlje (narandžasti red)
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
                    // Uzimamo sirovu vrednost bez trimovanja da sačuvamo entere
                    $val = $row[$colIndex] ?? '';

                    // Provera da li red uopšte ima ikakvog teksta (za preskakanje skroz praznih redova)
                    if (!empty(trim($val))) $hasContent = true;

                    $rowData[$name] = $val;
                }

                if ($hasContent) {
                    $dataRows[] = $rowData;
                }
            }
        }

        return [
            'headers' => array_keys($headerMapping),
            'data' => $dataRows
        ];
    }catch (Exception $e) {
        $trace = $e->getTrace();
        $tvojaLinija = "Nepoznato";
        $tvojFajl = "Nepoznato";

        foreach ($trace as $step) {
            // Tražimo prvi fajl koji si ti napisao (izvan vendor foldera)
            if (isset($step['file']) && strpos($step['file'], 'vendor') === false) {
                $tvojFajl = $step['file'];
                $tvojaLinija = $step['line'];
                break;
            }
        }

        return [
            'error' => $e->getMessage(),
            'detalji' => "Greška se desila u tvom fajlu: $tvojFajl na liniji $tvojaLinija"
        ];
    }
}