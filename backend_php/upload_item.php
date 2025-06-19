<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET, DELETE");
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

// DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = isset($data['id']) ? intval($data['id']) : 0;



    if (!$id) {
        http_response_code(400);
        echo json_encode(["error" => "ID mancante o non valido"]);
        exit;
    }

    // Prima prendo il percorso della foto per cancellarla dal server
    $query = $mysqli->prepare("SELECT photo FROM prodotti WHERE id = ?");
    $query->bind_param("i", $id);
    $query->execute();
    $query->bind_result($photoPath);
    $query->fetch();
    $query->close();

    if ($photoPath && file_exists(__DIR__ . '/' . $photoPath)) {
        unlink(__DIR__ . '/' . $photoPath);
    }

    // Elimino l'elemento dal DB
    $stmt = $mysqli->prepare("DELETE FROM prodotti WHERE id = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Prodotto eliminato con successo"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Errore durante l'eliminazione"]);
    }

    $stmt->close();
    $mysqli->close();
    exit;
}

// GET
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

// POST
$item = $mysqli->real_escape_string($_POST['item'] ?? '');
$type = $mysqli->real_escape_string($_POST['type'] ?? '');
$size = $mysqli->real_escape_string($_POST['size'] ?? '');

if (empty($item) || empty($type)) {
    http_response_code(400);
    echo json_encode(["error" => "Campi obbligatori mancanti"]);
    exit;
}

$photo_path = null;
if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = __DIR__ . '/uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $tmpName = $_FILES['photo']['tmp_name'];
    $originalName = basename($_FILES['photo']['name']);
    $targetFile = $uploadDir . uniqid() . '_' . $originalName;

    if (move_uploaded_file($tmpName, $targetFile)) {
        $photo_path = 'uploads/' . basename($targetFile);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Errore nel caricamento della foto"]);
        exit;
    }
}

if ($photo_path) {
    $stmt = $mysqli->prepare("INSERT INTO prodotti (item, type, size, photo) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $item, $type, $size, $photo_path);
} else {
    $stmt = $mysqli->prepare("INSERT INTO prodotti (item, type, size) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $item, $type, $size);
}

if ($stmt->execute()) {
    $lastId = $mysqli->insert_id;  // Recupero ultimo ID inserito
    http_response_code(201);
    echo json_encode([
        "success" => true,
        "message" => "Prodotto inserito correttamente",
        "id" => $lastId,
        "photo" => $photo_path ?? ""
    ]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Errore nell'inserimento del prodotto"]);
}


$stmt->close();
$mysqli->close();
?>
