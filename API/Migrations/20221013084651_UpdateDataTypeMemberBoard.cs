using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class UpdateDataTypeMemberBoard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "status",
                table: "MemberBoard",
                newName: "Status");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "MemberBoard",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "Owner_Id",
                table: "Boards",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Boards_Owner_Id",
                table: "Boards",
                column: "Owner_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Boards_User_Owner_Id",
                table: "Boards",
                column: "Owner_Id",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Boards_User_Owner_Id",
                table: "Boards");

            migrationBuilder.DropIndex(
                name: "IX_Boards_Owner_Id",
                table: "Boards");

            migrationBuilder.DropColumn(
                name: "Owner_Id",
                table: "Boards");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "MemberBoard",
                newName: "status");

            migrationBuilder.AlterColumn<int>(
                name: "status",
                table: "MemberBoard",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
