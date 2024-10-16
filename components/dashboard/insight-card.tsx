import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function InsightsCard() {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your shop insights and statistics will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
