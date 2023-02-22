import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@frontierwallet/front-ui";
import Image from "next/image";
import parse from "html-react-parser";
import { FC } from "react";

export interface IApprovalsTable {
  approvalsList: [];
}

const ApprovalsTable: FC<IApprovalsTable> = (props) => {
  const { approvalsList } = props;
  return (
    <Table>
      <TableHeader className="sticky top-0 z-10 py-5 bg-bg-300 rounded-lg md:grid-cols-approvalTable grid-cols-chainCapabilitiesTableInMobile border-text-900 dark:border-textDark-900">
        <TableCell component="th py-5" className={`!bg-bg-300`}>
          <span className="sub_title ml-2 text-text-50 dark:text-textDark-50">
            Txn hash
          </span>
        </TableCell>
        <TableCell component="th" className={`!bg-bg-300`}>
          <span className="sub_title  text-text-50 dark:text-textDark-50">
            Block
          </span>
        </TableCell>
        <TableCell component="th" className={`!bg-bg-300`}>
          <span className="sub_title text-text-50 dark:text-textDark-50">
            Contract
          </span>
        </TableCell>
        <TableCell component="th" className={`!bg-bg-300`}>
          <span className="sub_title text-text-50 dark:text-textDark-50">
            Approved spender
          </span>
        </TableCell>
        <TableCell component="th" className={`!bg-bg-300`}>
          <span className="sub_title text-text-50 dark:text-textDark-50">
            Approved amount
          </span>
        </TableCell>
        <TableCell component="th" className={`!bg-bg-300`}>
          <span className="sub_title text-text-50 dark:text-textDark-50">
            Last updated
          </span>
        </TableCell>
      </TableHeader>
      <TableBody>
        {approvalsList?.map((_item: any, key) => (
          <TableRow
            key={key}
            className="first:border-none border-t border-text-900 dark:border-textDark-900 pl-2"
          >
            <div className="grid flex-1 w-full items-center relative py-2.5 md:grid-cols-approvalTable grid-cols-chainCapabilitiesTableInMobile">
              <TableCell>
                <span className="paragraph text-textDark-50">
                  <a
                    className={`${parse(_item.TxnHash)?.props.className}`}
                    target="_blank"
                    href={`https://polygonscan.com${
                      parse(_item.TxnHash).props.href
                    }`}
                  >
                    {parse(_item.TxnHash).props.children}
                  </a>
                  {/* {parse(_item.TxnHash)} */}
                </span>
              </TableCell>
              <TableCell>
                <div className="paragraph text-text-50 dark:text-textDark-50 flex items-center justify-start gap-2">
                  <span className="paragraph text-textDark-50">
                    <a
                      className={`${parse(_item.Block).props.className}`}
                      target="_blank"
                      href={`https://polygonscan.com${
                        parse(_item.Block).props.href
                      }`}
                    >
                      {parse(_item.Block).props.children}
                    </a>
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="paragraph text-text-50 dark:text-textDark-50 flex items-center justify-start gap-2">
                  <span className="paragraph text-textDark-50 flex">
                    <img
                      className="w-5 h-5 rounded-full"
                      src={`https://polygonscan.com${
                        parse(_item.Token).props.children[0].props.src
                      }`}
                    ></img>
                    <a
                      className={`${parse(_item.Token).props.className} ml-2`}
                      target="_blank"
                      href={`https://polygonscan.com${
                        parse(_item.Token).props.href
                      }`}
                    >
                      {parse(_item.Token).props.children[1]}
                    </a>
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="paragraph text-text-50 dark:text-textDark-50 flex items-center justify-start gap-2">
                  <span className="paragraph text-textDark-50">
                    <a
                      className={`${
                        parse(_item.ApprovedSpender).props.className
                      }`}
                      target="_blank"
                      href={`https://polygonscan.com${
                        parse(_item.ApprovedSpender).props.href
                      }`}
                    >
                      {parse(_item.ApprovedSpender).props.children}
                    </a>
                    {/* {parse(_item.ApprovedSpender)} */}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="paragraph text-text-50 dark:text-textDark-50 flex items-center justify-start gap-2">
                  <span className="paragraph text-textDark-50">
                    <a
                      className={``}
                      target="_blank"
                      href={`https://polygonscan.com${
                        parse(_item.ApprovedAmount)[1]?.props?.href
                      }`}
                    >
                      {parse(_item.ApprovedAmount)[0]}{" "}
                      {parse(_item.ApprovedAmount)[1]?.props?.children}
                    </a>
                    {/* {parse(_item.ApprovedAmount)} */}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="paragraph text-text-50 dark:text-textDark-50 flex items-center justify-start gap-2">
                  <span className="paragraph text-textDark-50">
                    <p
                      className={`${
                        parse(_item.LastUpdated)[0].props.className
                      }`}
                    >
                      {parse(_item.LastUpdated)[0].props.children}
                    </p>
                  </span>
                </div>
              </TableCell>
            </div>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ApprovalsTable;
