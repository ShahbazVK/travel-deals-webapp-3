<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['carId'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required parameter: carId']);
    exit;
}

$carId = $input['carId'];

$filePath = __DIR__ . '/../data/cars.xml';

if (!file_exists($filePath)) {
    http_response_code(404);
    echo json_encode(['error' => 'cars.xml file not found']);
    exit;
}

// Load XML file
$dom = new DOMDocument();
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;

if (!$dom->load($filePath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to load cars.xml']);
    exit;
}

$xpath = new DOMXPath($dom);
$cars = $xpath->query("//car[carId[text()='{$carId}']]");

if ($cars->length === 0) {
    http_response_code(404);
    echo json_encode(['error' => 'Car not found']);
    exit;
}

// Remove the car element (mark as unavailable)
$carToRemove = $cars->item(0);
$carToRemove->parentNode->removeChild($carToRemove);

// Save updated XML back to file
if ($dom->save($filePath) === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to write to cars.xml']);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => "Removed car {$carId} from availability",
    'carId' => $carId
]);
?>

