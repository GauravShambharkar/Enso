/**
 * @deprecated This hook has been deprecated and split into smaller, modular hooks
 * to avoid large files and simplify importing variables.
 *
 * Please use:
 * - {@link useEisenProjects} from "./useEisenProjects" for project-related operations
 * - {@link useEisenTasks} from "./useEisenTasks" for task-related operations
 */

export { useEisenProjects } from "./useEisenProjects";
export { useEisenTasks } from "./useEisenTasks";
export type { EisenTask, EisenProject } from "./useEisenProjects";
