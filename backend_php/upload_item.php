<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET");
header("Access-Control-Allow-Headers: Content-Type");

// Gestione preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Connessione DB
$mysqli = new mysqli("localhost", "utente_pesca", "FishingInventory", "pesca_inventory");
if ($mysqli->connect_errno) {
    http_response_code(500);
    echo json_encode(["error" => "Connessione al database fallita"]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $mysqli->query("SELECT id, item, type, size, photo FROM prodotti ORDER BY id DESC");
    $prodotti = [];
    while ($row = $result->fetch_assoc()) {
        $prodotti[] = $row;
    }
    header('Content-Type: application/json');
    echo json_encode($prodotti);
    $mysqli->close();
    exit;
}

// Prendi i dati dal POST (non JSON questa volta)
$item = $mysqli->real_escape_string($_POST['item'] ?? '');
$type = $mysqli->real_escape_string($_POST['type'] ?? '');
$size = $mysqli->real_escape_string($_POST['size'] ?? '');

// Controllo campi obbligatori
if (empty($item) || empty($type)) {
    http_response_code(400);
    echo json_encode(["error" => "Campi obbligatori mancanti"]);
    exit;
}

// Gestione upload foto
$photo_path = null;
if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = __DIR__ . '/uploads/'; // cartella uploads nel backend
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $tmpName = $_FILES['photo']['tmp_name'];
    $originalName = basename($_FILES['photo']['name']);
    $targetFile = $uploadDir . uniqid() . '_' . $originalName;

    if (move_uploaded_file($tmpName, $targetFile)) {
        // Salvo solo il nome/file path relativo da salvare in DB
        $photo_path = 'uploads/' . basename($targetFile);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Errore nel caricamento della foto"]);
        exit;
    }
}

// Query INSERT con o senza foto
if ($photo_path) {
    $stmt = $mysqli->prepare("INSERT INTO prodotti (item, type, size, photo) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $item, $type, $size, $photo_path);
} else {
    $stmt = $mysqli->prepare("INSERT INTO prodotti (item, type, size) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $item, $type, $size);
}

if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode(["success" => true, "message" => "Prodotto inserito correttamente"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Errore nell'inserimento del prodotto"]);
}

$stmt->close();
$mysqli->close();
?>
