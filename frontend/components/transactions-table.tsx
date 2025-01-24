import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TransactionsTable() {
  return (
    <div className="rounded-3xl bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[100px]">Situação</TableHead>
            <TableHead className="w-[100px]">Data</TableHead>
            <TableHead className="w-[300px]">Descrição</TableHead>
            <TableHead className="w-[200px]">Conta</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{/* Add your transaction rows here */}</TableBody>
      </Table>
    </div>
  )
}

