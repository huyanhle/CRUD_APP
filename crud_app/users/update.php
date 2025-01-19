<?php
include '../config.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id) && (isset($data->name) || isset($data->email))) {
    $sql = "UPDATE users SET name = :name, email = :email WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'name' => $data->name,
        'email' => $data->email,
        'id' => $data->id
    ]);
    echo json_encode(['message' => 'User updated successfully']);
} else {
    echo json_encode(['message' => 'Invalid input']);
}
?>
