import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SalesHistoryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales History</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your sales history graph will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
