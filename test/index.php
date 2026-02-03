<?php
/**
 * Created by PhpStorm.
 * User: Milos Pavic <naucnik1977 at yahoo.com>
 * Date: 3.2.2026.
 * Time: 02:53
 */
// Uključivanje kompletnog debug-a
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
require_once '../php/process_excel.php';


$result = [];
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['excel_file'])) {
    $result = getExcelPreview($_FILES['excel_file']['tmp_name']);
}
?>

<!DOCTYPE html>
<html lang="sr">
<head>
    <meta charset="UTF-8">
    <title>Bulk Order Preview</title>
    <style>
        body { font-family: sans-serif; padding: 20px; color: #333; }
        .table-wrapper { width: 100%; overflow-x: auto; margin-top: 20px; border: 1px solid #ccc; }
        table { border-collapse: collapse; min-width: 1500px; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; font-size: 13px; }
        th { background-color: #f4f4f4; position: sticky; top: 0; }
        tr:nth-child(even) { background-color: #fafafa; }
        .upload-section { background: #f9f9f9; padding: 20px; border-radius: 5px; border: 1px solid #eee; }
    </style>
</head>
<body>

    <div class="upload-section">
        <h2>Uvoz Billet Coin podataka</h2>
        <form method="POST" enctype="multipart/form-data">
            <input type="file" name="excel_file" accept=".xlsx, .xls, .csv" required>
            <button type="submit">Učitaj i prikaži</button>
        </form>
    </div>

    <?php if (!empty($result['data'])): ?>
        <div class="table-wrapper">
            <table>
                <thead>

                    <tr>
                        <th>#</th>
                        <?php foreach ($result['headers'] as $header): ?>
                            <th><?= htmlspecialchars($header) ?></th>
                        <?php endforeach; ?>
                    </tr>
                </thead>
                <tbody>
                    <?php $index = 1; ?>
                    <?php foreach ($result['data'] as $row): ?>
                        <tr>
                            <td><?=$index++?></td>
                            <?php foreach ($result['headers'] as $header): ?>
                                <td><?= htmlspecialchars($row[$header] ?? '') ?></td>
                            <?php endforeach; ?>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    <?php elseif (isset($result['error'])): ?>
    <p><?=  date("Y-m-d H:i:s"); ?></p>
        <p style="color:red;">Greška: <?= $result['error'] ?></p>
        <p style="color:red;">Detalji: <?= $result['detalji'] ?></p>
    <?php endif; ?>

</body>
</html>