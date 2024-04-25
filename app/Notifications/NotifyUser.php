<?php

namespace App\Notifications;

use App\Models\CompteRendu;
use App\Models\Seance;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use PhpParser\Builder\Property;

class NotifyUser extends Notification
{
    use Queueable;

    protected $compte_rendu;

    /**
     * Create a new notification instance.
     */
    public function __construct(CompteRendu $compte_rendu)
    {
        $this->compte_rendu = $compte_rendu;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return [/*'mail', */'database'];
    }


    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'compte_rendu_id' => $this->compte_rendu->id,
            'date' => $this->compte_rendu->date,
        ];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'compte_rendu_id' => $this->compte_rendu->id,
            'date' => $this->compte_rendu->date,
        ];
    }
}
