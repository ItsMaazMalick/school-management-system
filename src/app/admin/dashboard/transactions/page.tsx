import { getTransactionsForSchoolUsingSession } from "@/actions/school";
import { RouteTitle } from "@/components/RouteTitle";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/format-date";
import { amountToPKRFormat } from "@/lib/pkr-format";

export default async function Transactions() {
  const transactions = await getTransactionsForSchoolUsingSession();
  // const transactions: any = [];
  console.log(transactions);
  return (
    <div>
      <RouteTitle route="Dashboard" subRoute="Transactions" />
      {transactions && transactions.length > 0 ? (
        <Table>
          <TableCaption>A list of your recent transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">TRX ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Datetime</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, idx) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {transaction.trxId}
                </TableCell>
                <TableCell>{transaction.title}</TableCell>
                <TableCell>{amountToPKRFormat(transaction.amount)}</TableCell>
                <TableCell className="text-right">
                  {formatDate(transaction.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">TRX ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Datetime</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <p className="text-sm text-center text-destructive my-4 font-semibold p-4 ring-1">
            No Data Found
          </p>
        </>
      )}
    </div>
  );
}
