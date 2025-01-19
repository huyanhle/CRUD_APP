<?php
include '../config.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    $sql = "DELETE FROM users WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $data->id]);
    echo json_encode(['message' => 'User deleted successfully']);
} else {
    echo json_encode(['message' => 'Invalid input']);
}
?>
