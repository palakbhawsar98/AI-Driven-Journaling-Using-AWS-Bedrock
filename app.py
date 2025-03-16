import json
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("JournalEntryDB")

def lambda_handler(event, context):
    try:
        body = json.loads(event["body"])
        table.put_item(Item={
            "EntryID": body["EntryID"],
            "Date": body["Date"],
            "Text": body["Text"]
        })

        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"message": "Entry saved successfully!"})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": str(e)})
        }

