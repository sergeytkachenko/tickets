<?php if ($this->length($page->items) > 0) { ?>
    <table class="table table-striped table-advance table-hover">
        <thead>
        <tr>
            <th colspan="3">

            </th>
            <th class="pagination-control" colspan="3">
                <?php if ($page->before != $page->next) { ?>
                    <span class="pagination-info">
                            <?php echo $page->current; ?> из <?php echo $page->total_pages; ?>
                        </span>
                    <a class="btn btn-sm blue" href="?page=<?php echo $page->before; ?>">
                        <i class="fa fa-angle-left"></i>
                    </a>
                    <a class="btn btn-sm blue" href="?page=<?php echo $page->next; ?>">
                        <i class="fa fa-angle-right"></i>
                    </a>
                <?php } ?>
            </th>
        </tr>
        </thead>
        <tbody>
        <?php foreach ($page->items as $message) { ?>
            <tr data-messageid="<?php echo $message->id; ?>" class="<?php if ($message->is_unread == 1) { ?>unread<?php } ?>" onclick="location.href='/message/read/<?php echo $message->id; ?>'">
                <td class="inbox-small-cells">
                    <i class="fa  <?php if ($message->is_unread == 1) { ?> fa-spinner <?php } else { ?> fa-check <?php } ?>"></i>
                </td>
                <td class="view-message hidden-xs">
                    <?php echo $message->UsersRecipient->email; ?>
                </td>
                <td class="view-message view-message">
                    <?php echo $message->subject; ?>
                </td>
                <td class="view-message inbox-small-cells">
                    <a href="/message/delete/<?php echo $message->id; ?>"> <i class="fa fa-trash-o"></i></a>
                </td>
                <td class="view-message text-right">
                    <?php echo $message->date; ?>
                </td>
            </tr>
        <?php } ?>
        </tbody>
    </table>
<?php } else { ?>
    <p class="bg-warning" style="padding: 20px">
        <strong>У вас нет сообщений в данной категории</strong>
    </p>
<?php } ?>