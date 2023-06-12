import React from "react";
import styles from "./task-list-table.module.css";
import { Task } from "../../types/public-types";

export const TaskListTableDefault: React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  groupNames: string[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
  nameCellComponent?: React.FC<any>;
}> = ({
  rowHeight,
  rowWidth,
  groupNames,
  fontFamily,
  fontSize
}) => {
    return (
      <div
        className={styles.taskListWrapper}
        style={{
          fontFamily: fontFamily,
          fontSize: fontSize,
        }}
      >
        {groupNames.map((groupName, index) => {
          return (
            <div
              className={styles.taskListTableRow}
              style={{ height: rowHeight }}
              key={`${index}row`}
            >
              <div
                className={styles.taskListCell}
                style={{
                  minWidth: rowWidth,
                  maxWidth: rowWidth,
                }}
                title={groupName}
              >
                <div className={styles.taskListNameWrapper}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {groupName}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
