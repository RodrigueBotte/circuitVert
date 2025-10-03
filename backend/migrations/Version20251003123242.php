<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251003123242 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_favorites (user_id INT NOT NULL, professional_info_id INT NOT NULL, INDEX IDX_E489ED11A76ED395 (user_id), INDEX IDX_E489ED11D2AEE175 (professional_info_id), PRIMARY KEY(user_id, professional_info_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_favorites ADD CONSTRAINT FK_E489ED11A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_favorites ADD CONSTRAINT FK_E489ED11D2AEE175 FOREIGN KEY (professional_info_id) REFERENCES professional_info (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_favorites DROP FOREIGN KEY FK_E489ED11A76ED395');
        $this->addSql('ALTER TABLE user_favorites DROP FOREIGN KEY FK_E489ED11D2AEE175');
        $this->addSql('DROP TABLE user_favorites');
    }
}
