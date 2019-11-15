<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190328200532 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE suiveur (id INT AUTO_INCREMENT NOT NULL, utilisateur_id INT DEFAULT NULL, email VARCHAR(255) NOT NULL, tel VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_632AF7AEFB88E14F (utilisateur_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE suiveur ADD CONSTRAINT FK_632AF7AEFB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE medicament ADD suiveur_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE medicament ADD CONSTRAINT FK_9A9C723A35E10B95 FOREIGN KEY (suiveur_id) REFERENCES suiveur (id)');
        $this->addSql('CREATE INDEX IDX_9A9C723A35E10B95 ON medicament (suiveur_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE medicament DROP FOREIGN KEY FK_9A9C723A35E10B95');
        $this->addSql('DROP TABLE suiveur');
        $this->addSql('DROP INDEX IDX_9A9C723A35E10B95 ON medicament');
        $this->addSql('ALTER TABLE medicament DROP suiveur_id');
    }
}
