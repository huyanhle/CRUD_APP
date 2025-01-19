<?php
include '../config.php';

$page = $_GET['page'] ?? 1;
$limit = 5; // Số bản ghi trên mỗi trang
$offset = ($page - 1) * $limit;

$sql = "SELECT * FROM users LIMIT :limit OFFSET :offset";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', (int)$offset, PDO::PARAM_INT);
$stmt->execute();

$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Lấy tổng số bản ghi để tính tổng số trang
$total = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
$totalPages = ceil($total / $limit);

echo json_encode(['users' => $users, 'totalPages' => $totalPages]);
?>
