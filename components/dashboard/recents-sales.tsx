import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentSalesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your recent sales data will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
