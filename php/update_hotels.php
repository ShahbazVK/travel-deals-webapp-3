<?php
// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors to user, but log them
ini_set('log_errors', 1);

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

if ($input === null) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input']);
    exit;
}

if (!isset($input['hotelId']) || !isset($input['roomsToDeduct']) || !isset($input['checkIn']) || !isset($input['checkOut'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required parameters']);
    exit;
}

$hotelId = $input['hotelId'];
$roomsToDeduct = (int)$input['roomsToDeduct'];
$checkIn = $input['checkIn'];
$checkOut = $input['checkOut'];

$filePath = __DIR__ . '/../data/hotels.xml';

if (!file_exists($filePath)) {
    http_response_code(404);
    echo json_encode(['error' => 'hotels.xml file not found']);
    exit;
}

// Load XML file with error handling
libxml_use_internal_errors(true);
$xml = simplexml_load_file($filePath);

if ($xml === false) {
    $errors = libxml_get_errors();
    $errorMessages = [];
    foreach ($errors as $error) {
        $errorMessages[] = trim($error->message);
    }
    libxml_clear_errors();
    
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to parse hotels.xml',
        'details' => $errorMessages,
        'filePath' => $filePath,
        'fileExists' => file_exists($filePath),
        'isReadable' => is_readable($filePath)
    ]);
    exit;
}

try {
    $checkInDate = new DateTime($checkIn);
    $checkOutDate = new DateTime($checkOut);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid date format: ' . $e->getMessage()]);
    exit;
}

$updatedCount = 0;

// Find and update hotel entries within the date range
foreach ($xml->hotel as $hotel) {
    if ((string)$hotel->hotelId === $hotelId) {
        try {
            $hotelDateStr = (string)$hotel->date;
            if (empty($hotelDateStr)) {
                continue; // Skip if date is empty
            }
            $hotelDate = new DateTime($hotelDateStr);
            
            // Update if hotel date is within booking date range
            // Note: checkOut date should be exclusive (you check out on that date, so you don't stay that night)
            // But we need to include dates from checkIn to checkOut-1 day
            if ($hotelDate >= $checkInDate && $hotelDate < $checkOutDate) {
                $currentRooms = (int)$hotel->availableRooms;
                $newRooms = max(0, $currentRooms - $roomsToDeduct);
                $hotel->availableRooms = $newRooms;
                $updatedCount++;
            }
        } catch (Exception $e) {
            // Skip invalid dates and continue
            continue;
        }
    }
}

if ($updatedCount === 0) {
    http_response_code(404);
    echo json_encode(['error' => 'No hotel entries found for the specified date range']);
    exit;
}

// Save updated XML back to file
try {
    $result = $xml->asXML($filePath);
    if ($result === false) {
        // Check if it's a permissions issue
        if (!is_writable($filePath)) {
            http_response_code(500);
            echo json_encode(['error' => 'hotels.xml file is not writable. Please check file permissions.']);
            exit;
        }
        http_response_code(500);
        echo json_encode(['error' => 'Failed to write to hotels.xml']);
        exit;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error saving XML: ' . $e->getMessage()]);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => "Updated hotel {$hotelId}: deducted {$roomsToDeduct} rooms for {$updatedCount} date(s)",
    'hotelId' => $hotelId,
    'roomsDeducted' => $roomsToDeduct,
    'datesUpdated' => $updatedCount
]);
?>

