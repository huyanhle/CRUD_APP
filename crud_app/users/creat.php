<?php
include '../config.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->name) && isset($data->email)) {
    $sql = "INSERT INTO users (name, email) VALUES (:name, :email)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['name' => $data->name, 'email' => $data->email]);
    echo json_encode(['message' => 'User created successfully']);
} else {
    echo json_encode(['message' => 'Invalid input']);
}
?>
