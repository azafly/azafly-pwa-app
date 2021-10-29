// import { useState } from 'react';
// import { makeStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles';
// import {
//     Checkbox,
//     CheckboxProps,
//     FormControlLabel,
//     List,
//     ListItem,
//     ListItemIcon,
//     ListItemSecondaryAction,
//     IconButton,
//     Typography
// } from '@material-ui/core';
// import CommentIcon from '@material-ui/icons/Comment';
// import { useUpdateTaskMutation } from 'api/generated/graphql';

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         root: {
//             maxWidth: 450,
//             marginTop: 50,
//             [theme.breakpoints.only('xs')]: {
//                 marginTop: 10,
//                 width: '100%'
//             }
//         },
//         title: {
//             fontWeight: 700
//         },
//         formControlLabel: {
//             fontSize: '0.85rem'
//         },
//         done: {
//             textDecoration: 'line-through',
//             color: theme.colors.base
//         },
//         listItem: {
//             transition: theme.transitions.create(['margin', 'width'], {
//                 easing: theme.transitions.easing.sharp,
//                 duration: theme.transitions.duration.leavingScreen
//             })
//         }
//     })
// );

// interface TaskListProps {
//     taskList: any;
// }

// const TodoCheckbox = withStyles({
//     root: {
//         color: 'red',
//         '&$checked': {
//             color: '#4990A4',
//             textDecoration: 'line-through'
//         }
//     },
//     checked: {
//         color: '#4990A4',
//         textDecoration: 'line-through'
//     }
// })((props: CheckboxProps) => <Checkbox color='default' {...props} />);

// export default function TaskList({ taskList }: TaskListProps) {
//     const classes = useStyles();
//     const [currentTask, setCurrentTask] = useState<any>(null);

//     const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
//         variables: {
//             id: currentTask?.id ?? '',
//             transaction_id: currentTask?.transaction_id ?? '',
//             user_id: currentTask?.user_id ?? '',
//             is_done: !currentTask?.isDone
//         }
//     });

//     const handleUpdateTask = (task: any) => {
//         new Promise<void>(resolve => {
//             setCurrentTask(task);
//             resolve();
//         }).then(() => {
//             updateTaskMutation().catch(error => console.warn(error));
//         });
//     };

//     return !taskList.length ? null : (
//         <div className={classes.root}>
//             <Typography className={classes.title} variant='h6' color='secondary'>
//                 Your Tasks
//             </Typography>
//             <List>
//                 {taskList.map((task: any) => {
//                     return (
//                         <ListItem key={task.id} role={undefined} dense button onClick={() => handleUpdateTask(task)} className={classes.listItem}>
//                             <ListItemIcon>
//                                 <FormControlLabel
//                                     control={<TodoCheckbox checked={task.isDone} tabIndex={-1} edge='start' disableRipple />}
//                                     label={
//                                         <Typography className={`${classes.formControlLabel} ${task.isDone ? classes.done : ''}`}>
//                                             {task.info_text}
//                                         </Typography>
//                                     }
//                                 />
//                             </ListItemIcon>
//                             <ListItemSecondaryAction>
//                                 <IconButton edge='end' aria-label='comments'>
//                                     <CommentIcon />
//                                 </IconButton>
//                             </ListItemSecondaryAction>
//                         </ListItem>
//                     );
//                 })}
//             </List>
//         </div>
//     );
// }

export {};
